export default defineNuxtRouteMiddleware(async (to, from) => {
  // Skip auth check during SSR to prevent hydration mismatch
  if (process.server) return;

  const { isAuthenticated, checkAuth } = useAuthStore();

  // Check if user is already authenticated
  if (!isAuthenticated) {
    try {
      const isValid = await checkAuth();
      if (isValid) {
        return navigateTo('/dashboard');
      }
    } catch (error) {
      // User is not authenticated, allow access to guest routes
      return;
    }
  } else {
    // User is already authenticated, redirect to dashboard
    return navigateTo('/dashboard');
  }
});
