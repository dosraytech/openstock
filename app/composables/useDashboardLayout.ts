export const useDashboardLayout = () => {
  const { user, logout } = useAuthStore();
  const route = useRoute();

  // State
  const sidebarOpen = ref(false);
  const isClientSide = ref(false);

  // Initialize client-side flag
  onMounted(() => {
    isClientSide.value = true;
  });

  // Page title based on current route
  const pageTitle = computed(() => {
    if (!isClientSide.value) return 'Dashboard';

    const titles: Record<string, string> = {
      '/': 'Dashboard',
      '/dashboard/orders': 'Orders',
      '/dashboard/contacts': 'Contacts',
      '/dashboard/deals': 'Deals',
      '/dashboard/analytics': 'Analytics',
      '/dashboard/settings': 'Settings',
      '/dashboard/profile': 'Profile',
    };
    return titles[route.path] || 'Dashboard';
  });

  // Sidebar controls
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
  };

  const closeSidebar = () => {
    sidebarOpen.value = false;
  };

  // Close sidebar on route change (mobile) - only on client
  watch(
    () => route.path,
    () => {
      if (isClientSide.value) {
        sidebarOpen.value = false;
      }
    }
  );

  return {
    user,
    sidebarOpen,
    pageTitle,
    toggleSidebar,
    closeSidebar,
  };
};
