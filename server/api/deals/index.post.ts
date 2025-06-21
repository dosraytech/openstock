import { getAuthenticatedPocketBase } from '../../utils/pocketbase';

export default defineEventHandler(async (event) => {
  try {
    // Use centralized authentication
    const { pb } = await getAuthenticatedPocketBase(event);

    // Get request body
    const body = await readBody(event);

    // Validate required fields
    if (
      !body.title ||
      body.value === undefined ||
      !body.stage ||
      body.probability === undefined
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Title, value, stage, and probability are required',
      });
    }

    // Create deal
    const deal = await pb.collection('deals').create({
      title: body.title,
      description: body.description || '',
      value: Number(body.value),
      contact: body.contact || null,
      stage: body.stage,
      probability: Number(body.probability),
      expectedCloseDate: body.expectedCloseDate || null,
    });

    return deal;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to create deal',
    });
  }
});
