import {
  getAuthenticatedPocketBase,
  requireAdmin,
} from '../../utils/pocketbase';

export default defineEventHandler(async (event) => {
  try {
    const { pb, isAdmin } = await getAuthenticatedPocketBase(event);

    // Require admin privileges for updating categories
    requireAdmin(isAdmin);

    // Get category ID from route
    const id = getRouterParam(event, 'id');

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Category ID is required',
      });
    }

    // Get request body
    const body = await readBody(event);

    // Update category
    const category = await pb.collection('categories').update(id, {
      name: body.name,
      code: body.code,
      description: body.description,
      color: body.color,
      isActive: body.isActive,
    });

    return category;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to update category',
    });
  }
});
