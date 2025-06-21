import { getAuthenticatedPocketBase } from '../../utils/pocketbase';

export default defineEventHandler(async (event) => {
  try {
    const { pb } = await getAuthenticatedPocketBase(event);

    // Fetch deals with expanded contact relation
    const deals = await pb.collection('deals').getFullList({
      sort: '-created',
      expand: 'contact',
    });

    return deals;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch deals',
    });
  }
});
