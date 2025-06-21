export default defineEventHandler(async (event) => {
  // Clear the auth cookie
  setCookie(event, 'pb_auth', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0, // Expire immediately
  });

  return { success: true };
});
