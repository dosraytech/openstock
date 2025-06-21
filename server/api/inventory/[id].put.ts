import {
  getAuthenticatedPocketBase,
  requireAdmin,
} from '../../utils/pocketbase';

export default defineEventHandler(async (event) => {
  try {
    // Use centralized authentication
    const { pb, isAdmin } = await getAuthenticatedPocketBase(event);

    // Require admin privileges for updating inventory
    requireAdmin(isAdmin);

    // Get the item ID from the route
    const id = getRouterParam(event, 'id');
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Item ID is required',
      });
    }

    // Get request body
    const body = await readBody(event);

    // Validate required fields
    if (
      !body.name ||
      !body.sku ||
      body.currentStock === undefined ||
      body.minStock === undefined ||
      body.unitPrice === undefined
    ) {
      throw createError({
        statusCode: 400,
        statusMessage:
          'Name, SKU, current stock, min stock, and unit price are required',
      });
    }

    // Update inventory item
    const item = await pb.collection('inventory').update(id, {
      name: body.name,
      sku: body.sku,
      description: body.description || '',
      category: body.category || null,
      currentStock: Number(body.currentStock),
      minStock: Number(body.minStock),
      unitPrice: Number(body.unitPrice),
      supplier: body.supplier || null,
    });

    return item;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to update inventory item',
    });
  }
});
