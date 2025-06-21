/**
 * Security utilities for input sanitization and rate limiting
 */

// Rate limiting storage (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Input sanitization utility
 * Removes potentially dangerous characters and HTML tags
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove HTML tags and dangerous characters
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>'"&]/g, (char) => {
      // Escape dangerous characters
      const entities: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;',
      };
      return entities[char] || char;
    })
    .trim();
}

/**
 * Sanitize object properties recursively
 */
export function sanitizeObject(obj: any): any {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  const sanitized: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else if (typeof value === 'object') {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Rate limiting utility
 * Limits the number of requests per IP address
 */
export function rateLimit(
  event: any,
  options: {
    max: number;
    windowMs: number;
    message?: string;
  } = { max: 100, windowMs: 15 * 60 * 1000 } // Default: 100 requests per 15 minutes
): boolean {
  const clientIP = getClientIP(event) || 'unknown';
  const key = `rate_limit:${clientIP}`;
  const now = Date.now();

  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    // Reset rate limit window
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + options.windowMs,
    });
    return true;
  }

  if (record.count >= options.max) {
    throw createError({
      statusCode: 429,
      statusMessage:
        options.message || 'Too many requests. Please try again later.',
    });
  }

  // Increment request count
  record.count++;
  rateLimitStore.set(key, record);

  return true;
}

/**
 * Enhanced rate limiting for authentication endpoints
 */
export function authRateLimit(event: any): boolean {
  return rateLimit(event, {
    max: 5, // 5 attempts
    windowMs: 15 * 60 * 1000, // 15 minutes
    message:
      'Too many authentication attempts. Please try again in 15 minutes.',
  });
}

/**
 * Extract client IP address
 */
function getClientIP(event: any): string | null {
  const headers = getHeaders(event);

  // Check various headers for client IP
  const possibleHeaders = [
    'x-forwarded-for',
    'x-real-ip',
    'x-client-ip',
    'cf-connecting-ip', // Cloudflare
    'true-client-ip',
  ];

  for (const header of possibleHeaders) {
    const value = headers[header];
    if (value) {
      // Get first IP if multiple are present
      const ip = Array.isArray(value) ? value[0] : value.toString();
      return ip.split(',')[0].trim();
    }
  }

  return null;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Secure logging utility that prevents sensitive information exposure
 */
export function secureLog(
  level: 'info' | 'warn' | 'error',
  message: string,
  data?: any
) {
  if (process.env.NODE_ENV === 'development') {
    const logData = data ? { ...data } : {};

    // Remove sensitive fields from log data
    const sensitiveFields = ['password', 'token', 'auth', 'cookie', 'session'];
    for (const field of sensitiveFields) {
      if (logData[field]) {
        logData[field] = '[REDACTED]';
      }
    }

    console[level](message, logData);
  }

  // In production, send to proper logging service
  // Example: await logService.log(level, message, data);
}
