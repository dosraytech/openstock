import { getAuthenticatedPocketBase } from '../../utils/pocketbase';

export default defineEventHandler(async (event) => {
  try {
    const { pb } = await getAuthenticatedPocketBase(event);

    // Fetch contacts
    const contacts = await pb.collection('contacts').getFullList({
      sort: '-created',
    });

    return contacts;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch contacts',
    });
  }
});
