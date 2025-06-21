import PocketBase from 'pocketbase';

// Validate environment variables at startup
function validateEnvironment() {
  const BASE_URL = process.env.BASE_URL;

  if (!BASE_URL) {
    throw new Error('BASE_URL environment variable is required');
  }

  if (
    process.env.NODE_ENV === 'production' &&
    !BASE_URL.startsWith('https://')
  ) {
    throw new Error('BASE_URL must use HTTPS in production environment');
  }

  // Additional validation for URL format
  try {
    new URL(BASE_URL);
  } catch (error) {
    throw new Error('BASE_URL must be a valid URL');
  }
}

// Validate environment on module load
validateEnvironment();

export interface AuthenticatedPocketBase {
  pb: PocketBase;
  userId: string;
  user: any;
  isAdmin: boolean;
}

export async function getAuthenticatedPocketBase(
  event: any
): Promise<AuthenticatedPocketBase> {
  // Get the authorization token from cookies
  const token = getCookie(event, 'pb_auth');

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'No authentication token provided',
    });
  }

  // Initialize PocketBase
  const pb = new PocketBase(process.env.BASE_URL);

  // Set the auth token
  pb.authStore.save(token);

  // Refresh the auth store to load the user model
  try {
    await pb.collection('users').authRefresh();
  } catch (refreshError) {
    // Safe error handling - no sensitive information logged
    throw createError({
      statusCode: 401,
      statusMessage: 'Failed to refresh authentication',
    });
  }

  // Verify the token is valid
  if (!pb.authStore.isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid authentication token',
    });
  }

  // Get the authenticated user
  const user = pb.authStore.model;

  if (!user || !user.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'User not authenticated',
    });
  }

  return {
    pb,
    userId: user.id,
    user,
    isAdmin: user.admin || false,
  };
}

export function handlePocketBaseError(error: any, defaultMessage: string) {
  throw createError({
    statusCode: error.statusCode || 500,
    statusMessage: error.statusMessage || defaultMessage,
  });
}

export function requireAdmin(isAdmin: boolean) {
  if (!isAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Admin privileges required',
    });
  }
}
