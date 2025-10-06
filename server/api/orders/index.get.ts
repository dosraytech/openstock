import { getAuthenticatedPocketBase } from '../../utils/pocketbase';
// Import H3 utility for handling query parameters
import { defineEventHandler, getQuery } from 'h3'; 

/**
 * Calculates the start of a period relative to the current date, ensuring
 * the timezone is handled consistently for PocketBase's UTC `created` field.
 * * @param period 'today', 'this_week', 'this_month'
 * @returns The start date for the PocketBase filter (e.g., '2025-10-05 00:00:00').
 */
const getPeriodStart = (period: 'today' | 'this_week' | 'this_month'): Date => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-indexed
    const date = now.getDate();
    const day = now.getDay(); // 0=Sunday, 1=Monday...

    let start = new Date(year, month, date, 0, 0, 0, 0); // Start of today (Local Time)

    switch (period) {
        case 'this_week':
            // Move back to the start of the week (assuming Sunday=0 or Monday=1)
            // This example uses a common convention: start week on Monday (1).
            // Adjusting for a Monday start: (day + 6) % 7 gives days to subtract from current day
            const diff = (day + 6) % 7; 
            start = new Date(year, month, date - diff, 0, 0, 0, 0);
            break;
        case 'this_month':
            // Start of the month is always day 1
            start = new Date(year, month, 1, 0, 0, 0, 0);
            break;
        case 'today':
        default:
            // Already set to start of today
            break;
    }
    return start;
};

// Helper to format a Date object for PocketBase's `created` filter
const formatPocketBaseDate = (date: Date): string => {
    // PocketBase expects UTC format (YYYY-MM-DD hh:mm:ss) without the 'Z'
    // This helper ensures it's formatted correctly as UTC for the filter comparison.
    const YYYY = date.getUTCFullYear();
    const MM = String(date.getUTCMonth() + 1).padStart(2, '0');
    const DD = String(date.getUTCDate()).padStart(2, '0');
    const hh = String(date.getUTCHours()).padStart(2, '0');
    const mm = String(date.getUTCMinutes()).padStart(2, '0');
    const ss = String(date.getUTCSeconds()).padStart(2, '0');
    
    return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
};


export default defineEventHandler(async (event) => {
  try {
    const { pb } = await getAuthenticatedPocketBase(event);
    
    // NEW: Get the 'period' from the query string (e.g., ?period=today)
    const query = getQuery(event);
    const period = query.period as 'today' | 'this_week' | 'this_month' | 'all_time' || 'today';

    let filter = '';

    if (period !== 'all_time') {
        // 1. Calculate the start of the required period (Local Time)
        const periodStartDateLocal = getPeriodStart(period);
        
        // 2. Calculate the start of the *next* period (Local Time)
        // This is a robust way to define the end boundary for 'today', 'this_week', or 'this_month'
        const now = new Date();
        let nextPeriodStartLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0); // Default: Start of Tomorrow

        if (period === 'this_week') {
             // Start of the NEXT week
            const day = now.getDay();
            const diff = 7 - (day + 6) % 7; // days until next Monday (start of next week)
            nextPeriodStartLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff, 0, 0, 0, 0);
        } else if (period === 'this_month') {
            // Start of the NEXT month
            nextPeriodStartLocal = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
        }

        // Convert the local start dates to PocketBase-compatible UTC strings
        const monthStartUTC = formatPocketBaseDate(periodStartDateLocal);
        const nextMonthStartUTC = formatPocketBaseDate(nextPeriodStartLocal);

        // 4. Construct the filter string: created >= [start] AND created < [end of period]
        filter = `created >= "${monthStartUTC}" && created < "${nextMonthStartUTC}"`;
    }
    // If period is 'all_time', the filter remains an empty string, fetching everything.

    // Fetch orders with expanded relations
    const orders = await pb.collection('orders').getFullList({
      sort: '-created',
      filter: filter, // Using the dynamically created filter
      expand: 'item,user,item.shop,item.service,order_details_via_order,order_payments_via_order',
    });

    console.log('DATA', orders)

    return orders;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch orders',
    });
  }
});