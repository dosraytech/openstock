import { getAuthenticatedPocketBase } from '../../utils/pocketbase';

export default defineEventHandler(async (event) => {
  try {
    // Use centralized authentication
    const { user } = await getAuthenticatedPocketBase(event);

    // Return user data (excluding sensitive information)
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      admin: user.admin,
      emailVisibility: user.emailVisibility,
      verified: user.verified,
      created: user.created,
      updated: user.updated,
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch user data',
    });
  }
});
