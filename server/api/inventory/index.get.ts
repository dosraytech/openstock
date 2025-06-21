import { getAuthenticatedPocketBase } from '../../utils/pocketbase';

export default defineEventHandler(async (event) => {
  try {
    const { pb } = await getAuthenticatedPocketBase(event);

    // Fetch inventory with expanded relations
    const inventory = await pb.collection('inventory').getFullList({
      sort: '-created',
      expand: 'category,supplier',
    });

    return inventory;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch inventory',
    });
  }
});
