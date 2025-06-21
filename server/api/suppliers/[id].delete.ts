import {
  getAuthenticatedPocketBase,
  requireAdmin,
} from '../../utils/pocketbase';

export default defineEventHandler(async (event) => {
  try {
    // Use centralized authentication
    const { pb, isAdmin } = await getAuthenticatedPocketBase(event);

    // Require admin privileges for deleting suppliers
    requireAdmin(isAdmin);

    // Get supplier ID from route
    const id = getRouterParam(event, 'id');

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Supplier ID is required',
      });
    }

    // Delete supplier
    await pb.collection('suppliers').delete(id);

    return { success: true, message: 'Supplier deleted successfully' };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to delete supplier',
    });
  }
});
