import {
  getAuthenticatedPocketBase,
  requireAdmin,
} from '../../utils/pocketbase';

export default defineEventHandler(async (event) => {
  try {
    // Use centralized authentication
    const { pb, isAdmin } = await getAuthenticatedPocketBase(event);

    // Require admin privileges for deletion
    requireAdmin(isAdmin);

    // Get the item ID from the route
    const id = getRouterParam(event, 'id');
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Item ID is required',
      });
    }

    // Delete inventory item
    await pb.collection('inventory').delete(id);

    return { success: true };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to delete inventory item',
    });
  }
});
