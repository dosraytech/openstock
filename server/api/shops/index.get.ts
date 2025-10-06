import { useAuthStore } from '~/stores/auth';
import { getAuthenticatedPocketBase } from '../../utils/pocketbase';
import { defineEventHandler, getQuery } from 'h3'; 


export default defineEventHandler(async (event) => {
  try {
    const { pb } = await getAuthenticatedPocketBase(event);
    
     const query = getQuery(event);
     const userId = query.user as 'id';

     console.log('Fetching shops for user:', userId);

    // Fetch categories
    const categories = await pb.collection('shops').getFullList({
      filter: `owner~"${userId}"`,
      sort: '-created',
    });

    return categories;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch shops',
    });
  }
});
