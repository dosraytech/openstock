import {
  getAuthenticatedPocketBase,
  requireAdmin,
} from '../../utils/pocketbase';

export default defineEventHandler(async (event) => {
  try {
    const { pb, isAdmin } = await getAuthenticatedPocketBase(event);

    // Require admin privileges for deleting categories
    requireAdmin(isAdmin);

    // Get category ID from route
    const id = getRouterParam(event, 'id');

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Category ID is required',
      });
    }

    // Delete category
    await pb.collection('categories').delete(id);

    return { success: true, message: 'Category deleted successfully' };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to delete category',
    });
  }
});
