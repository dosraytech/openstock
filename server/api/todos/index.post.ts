import { getAuthenticatedPocketBase } from '../../utils/pocketbase';

export default defineEventHandler(async (event) => {
  try {
    const { pb, userId } = await getAuthenticatedPocketBase(event);

    // Get request body
    const body = await readBody(event);

    // Validate required fields
    if (!body.title) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Title is required',
      });
    }

    // Create todo data
    const todoData: any = {
      title: body.title,
      description: body.description || '',
      completed: body.completed || false,
      dueDate: body.dueDate || null,
      priority: body.priority || 'medium',
      category: body.category || '',
      user: userId, // Always use the authenticated user's ID from the users collection
    };

    const todo = await pb.collection('todos').create(todoData);
    return todo;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to create todo',
    });
  }
});
