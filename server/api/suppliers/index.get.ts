import { getAuthenticatedPocketBase } from '../../utils/pocketbase';

export default defineEventHandler(async (event) => {
  try {
    const { pb } = await getAuthenticatedPocketBase(event);

    // Fetch suppliers
    const suppliers = await pb.collection('suppliers').getFullList({
      sort: '-created',
    });

    return suppliers;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch suppliers',
    });
  }
});
