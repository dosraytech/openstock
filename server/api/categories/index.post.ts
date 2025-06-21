import {
  getAuthenticatedPocketBase,
  requireAdmin,
} from '../../utils/pocketbase';

export default defineEventHandler(async (event) => {
  try {
    const { pb, isAdmin } = await getAuthenticatedPocketBase(event);

    // Require admin privileges for creating categories
    requireAdmin(isAdmin);

    // Get request body
    const body = await readBody(event);

    // Validate required fields
    if (!body.name || !body.code) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Name and code are required',
      });
    }

    // Create category
    const category = await pb.collection('categories').create({
      name: body.name,
      code: body.code,
      description: body.description || '',
      color: body.color || '',
      isActive: body.isActive !== undefined ? body.isActive : true,
    });

    return category;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to create category',
    });
  }
});
