import { getAuthenticatedPocketBase } from '../../utils/pocketbase';

export default defineEventHandler(async (event) => {
  try {
    const { pb } = await getAuthenticatedPocketBase(event);

    // Get request body
    const body = await readBody(event);

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'First name, last name, and email are required',
      });
    }

    // Create contact
    const contact = await pb.collection('contacts').create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone || '',
      company: body.company || '',
      position: body.position || '',
      status: body.status || 'prospect',
    });

    return contact;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to create contact',
    });
  }
});
