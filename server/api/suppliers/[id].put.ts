import {
  getAuthenticatedPocketBase,
  requireAdmin,
} from '../../utils/pocketbase';

export default defineEventHandler(async (event) => {
  try {
    // Use centralized authentication
    const { pb, isAdmin } = await getAuthenticatedPocketBase(event);

    // Require admin privileges for updating suppliers
    requireAdmin(isAdmin);

    // Get supplier ID from route
    const id = getRouterParam(event, 'id');

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Supplier ID is required',
      });
    }

    // Get request body
    const body = await readBody(event);

    // Update supplier
    const supplier = await pb.collection('suppliers').update(id, {
      name: body.name,
      code: body.code,
      contactPerson: body.contactPerson,
      email: body.email,
      phone: body.phone,
      category: body.category,
      status: body.status,
      lastOrderDate: body.lastOrderDate,
    });

    return supplier;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to update supplier',
    });
  }
});
