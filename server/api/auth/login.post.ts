import PocketBase from 'pocketbase';
import {
  authRateLimit,
  sanitizeInput,
  isValidEmail,
  secureLog,
} from '../../utils/security';

export default defineEventHandler(async (event) => {
  try {
    // Apply rate limiting to prevent brute force attacks
    authRateLimit(event);

    const body = await readBody(event);

    // Sanitize and validate input
    const email = sanitizeInput(body.email || '');
    const password = body.password || '';

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required',
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email format',
      });
    }

    const pb = new PocketBase(process.env.BASE_URL);

    const authData = await pb
      .collection('users')
      .authWithPassword(email, password);

    // Set the auth cookie with enhanced security
    setCookie(event, 'pb_auth', pb.authStore.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', // More restrictive than 'lax'
      maxAge: 60 * 60 * 24, // 24 hours instead of 7 days for better security
      path: '/',
    });

    // Secure logging - no sensitive information
    secureLog('info', 'User login successful', {
      userId: authData.record.id,
      email: email,
    });

    return {
      user: {
        id: authData.record.id,
        email: authData.record.email,
        name: authData.record.name,
        admin: authData.record.admin,
        emailVisibility: authData.record.emailVisibility,
        verified: authData.record.verified,
        created: authData.record.created,
        updated: authData.record.updated,
      },
      token: authData.token,
    };
  } catch (error: any) {
    // Secure logging for failed attempts
    secureLog('warn', 'Login attempt failed', {
      error: error.message,
      statusCode: error.status,
    });

    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication failed',
    });
  }
});
