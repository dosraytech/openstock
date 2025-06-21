import {
  getAuthenticatedPocketBase,
  requireAdmin,
} from '../../utils/pocketbase';

export default defineEventHandler(async (event) => {
  try {
    // Use centralized authentication
    const { pb, isAdmin } = await getAuthenticatedPocketBase(event);

    // Require admin privileges for creating suppliers
    requireAdmin(isAdmin);

    // Get request body
    const body = await readBody(event);

    // Validate required fields
    if (!body.name || !body.code || !body.contactPerson || !body.email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Name, code, contact person, and email are required',
      });
    }

    // Create supplier
    const supplier = await pb.collection('suppliers').create({
      name: body.name,
      code: body.code,
      contactPerson: body.contactPerson,
      email: body.email,
      phone: body.phone || '',
      category: body.category || '',
      status: body.status || 'active',
      lastOrderDate: body.lastOrderDate || null,
    });

    return supplier;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to create supplier',
    });
  }
});
