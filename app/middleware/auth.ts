export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated, checkAuth } = useAuthStore();

  // Check authentication status
  if (!isAuthenticated) {
    try {
      const isValid = await checkAuth();
      if (!isValid) {
        return navigateTo('/login');
      }
    } catch (error) {
      return navigateTo('/login');
    }
  }
});
