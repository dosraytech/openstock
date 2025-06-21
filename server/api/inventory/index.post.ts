import {
  getAuthenticatedPocketBase,
  requireAdmin,
} from '../../utils/pocketbase';
import { sanitizeObject, isValidEmail } from '../../utils/security';

export default defineEventHandler(async (event) => {
  try {
    // Use centralized authentication
    const { pb, isAdmin } = await getAuthenticatedPocketBase(event);

    // Require admin privileges for creating inventory items
    requireAdmin(isAdmin);

    // Get and sanitize request body
    const rawBody = await readBody(event);
    const body = sanitizeObject(rawBody);

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

    // Additional validation
    if (
      Number(body.currentStock) < 0 ||
      Number(body.minStock) < 0 ||
      Number(body.unitPrice) < 0
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Stock quantities and unit price must be non-negative',
      });
    }

    // Create inventory item
    const item = await pb.collection('inventory').create({
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
      statusMessage: error.statusMessage || 'Failed to create inventory item',
    });
  }
});
