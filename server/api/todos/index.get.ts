import { getAuthenticatedPocketBase } from '../../utils/pocketbase';

export default defineEventHandler(async (event) => {
  try {
    const { pb, userId, isAdmin } = await getAuthenticatedPocketBase(event);

    // Fetch todos based on user permissions
    const todos = await pb.collection('todos').getFullList({
      filter: isAdmin ? '' : `user = "${userId}"`,
      sort: '-created',
    });

    return todos;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch todos',
    });
  }
});
