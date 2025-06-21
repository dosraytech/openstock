export default defineNuxtPlugin(async () => {
  const { checkAuth } = useAuthStore();

  // Initialize authentication state on app start
  try {
    await checkAuth();
  } catch (error) {
    // Silently fail during SSR if auth check fails
    // No sensitive information logged to prevent security exposure
    if (process.dev) {
      console.warn('Auth initialization failed - user may need to login');
    }
  }
});
