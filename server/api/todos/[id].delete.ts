import { getAuthenticatedPocketBase } from '../../utils/pocketbase';

export default defineEventHandler(async (event) => {
  try {
    const { pb, userId, isAdmin } = await getAuthenticatedPocketBase(event);

    // Get todo ID from route
    const id = getRouterParam(event, 'id');

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Todo ID is required',
      });
    }

    // Check if todo exists and user has access to it
    let existingTodo;
    if (isAdmin) {
      // Admin can access any todo
      existingTodo = await pb.collection('todos').getOne(id);
    } else {
      // Regular user can only access their own todos
      existingTodo = await pb.collection('todos').getOne(id, {
        filter: `user = "${userId}"`,
      });
    }

    if (!existingTodo) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Todo not found or access denied',
      });
    }

    // Delete todo
    await pb.collection('todos').delete(id);

    return { success: true, message: 'Todo deleted successfully' };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to delete todo',
    });
  }
});
