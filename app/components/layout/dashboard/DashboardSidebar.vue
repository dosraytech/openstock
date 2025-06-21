<template>
  <div
    class="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 backdrop-blur-md"
    :class="{
      '-translate-x-full': !isOpen,
      'translate-x-0': isOpen,
    }"
  >
    <div
      class="flex items-center justify-between h-14 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm"
      ></div>
      <div class="flex items-center relative z-10">
        <div
          class="flex items-center justify-center w-8 h-8 bg-white/20 rounded-lg backdrop-blur-sm"
        >
          <Icon name="heroicons:building-office-2" class="h-5 w-5 text-white" />
        </div>
        <div class="ml-2">
          <span class="text-lg font-bold text-white">OpenStock</span>
          <div class="text-xs text-indigo-200 font-medium">Dashboard</div>
        </div>
      </div>
      <button
        @click="$emit('close')"
        class="lg:hidden relative z-10 p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
      >
        <Icon name="heroicons:x-mark" class="h-4 w-4" />
      </button>
    </div>

    <nav class="mt-4 px-3 overflow-y-auto sticky top-4">
      <div class="space-y-1">
        <div class="px-3 mb-2">
          <h3
            class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
          >
            Main Menu
          </h3>
        </div>
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
          class="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative overflow-hidden"
          :class="getNavLinkClass(item.path, item.isExact)"
        >
          <div class="flex items-center relative z-10">
            <div
              class="flex items-center justify-center w-7 h-7 rounded-md transition-all duration-200"
              :class="getIconContainerClass(item.path, item.isExact)"
            >
              <Icon :name="item.icon" class="h-4 w-4" />
            </div>
            <span class="ml-2.5">{{ item.label }}</span>
          </div>
          <div
            v-if="item.badge"
            class="ml-auto flex items-center justify-center w-4 h-4 bg-red-500 rounded-full"
          >
            <span class="text-xs font-bold text-white">{{ item.badge }}</span>
          </div>
          <div
            v-if="isActiveRoute(item.path, item.isExact)"
            class="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg"
          ></div>
        </NuxtLink>
      </div>

      <div class="mt-6 pt-4 border-t border-slate-700/50">
        <div class="px-3 mb-2">
          <h3
            class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
          >
            Quick Actions
          </h3>
        </div>
        <div class="space-y-1">
          <button
            class="w-full flex items-center px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 group"
          >
            <Icon
              name="heroicons:plus-circle"
              class="h-4 w-4 mr-2.5 text-green-400 group-hover:scale-110 transition-transform"
            />
            Add New Contact
          </button>
          <button
            class="w-full flex items-center px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 group"
          >
            <Icon
              name="heroicons:document-plus"
              class="h-4 w-4 mr-2.5 text-blue-400 group-hover:scale-110 transition-transform"
            />
            Create Deal
          </button>
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-slate-700/50">
        <div class="px-3 mb-2">
          <h3
            class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
          >
            Settings
          </h3>
        </div>
        <div class="space-y-1">
          <NuxtLink
            v-for="item in settingsItems"
            :key="item.path"
            :to="item.path"
            class="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative overflow-hidden"
            :class="getNavLinkClass(item.path, item.isExact)"
          >
            <div class="flex items-center relative z-10">
              <div
                class="flex items-center justify-center w-7 h-7 rounded-md transition-all duration-200"
                :class="getIconContainerClass(item.path, item.isExact)"
              >
                <Icon :name="item.icon" class="h-4 w-4" />
              </div>
              <span class="ml-2.5">{{ item.label }}</span>
            </div>
            <div
              v-if="isActiveRoute(item.path, item.isExact)"
              class="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg"
            ></div>
          </NuxtLink>
        </div>
      </div>

      <div class="mt-6 p-3">
        <div
          class="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-3 border border-slate-600/50"
        >
          <div class="flex items-center">
            <div
              class="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center"
            >
              <Icon name="heroicons:user" class="h-4 w-4 text-white" />
            </div>
            <div class="ml-2.5 flex-1">
              <div class="text-sm font-medium text-white">John Doe</div>
              <div class="text-xs text-slate-400">Administrator</div>
            </div>
            <button class="text-slate-400 hover:text-white transition-colors">
              <Icon name="heroicons:ellipsis-horizontal" class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div class="h-4"></div>
    </nav>
  </div>
</template>

<script setup lang="ts">
interface NavigationItem {
  path: string;
  label: string;
  icon: string;
  isExact?: boolean;
  badge?: number;
}

interface Props {
  isOpen: boolean;
}

defineProps<Props>();
defineEmits<{
  close: [];
}>();

const route = useRoute();

// Client-side route detection to prevent hydration mismatches
const isClientSide = ref(false);

onMounted(() => {
  isClientSide.value = true;
});

const navigationItems: NavigationItem[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: 'heroicons:home',
    isExact: true,
  },
  {
    path: '/dashboard/todos',
    label: 'Todos',
    icon: 'heroicons:check-circle',
    badge: 5,
  },
  {
    path: '/dashboard/contacts',
    label: 'Contacts',
    icon: 'heroicons:users',
  },
  {
    path: '/dashboard/deals',
    label: 'Deals',
    icon: 'heroicons:currency-dollar',
  },
  {
    path: '/dashboard/categories',
    label: 'Categories',
    icon: 'heroicons:tag',
  },
  {
    path: '/dashboard/inventory',
    label: 'Inventory',
    icon: 'heroicons:cube',
  },
  {
    path: '/dashboard/suppliers',
    label: 'Suppliers',
    icon: 'heroicons:truck',
  },
  {
    path: '/dashboard/analytics',
    label: 'Analytics',
    icon: 'heroicons:chart-bar',
  },
];

const settingsItems: NavigationItem[] = [
  {
    path: '/dashboard/profile',
    label: 'Profile',
    icon: 'heroicons:user-circle',
  },
  {
    path: '/dashboard/settings',
    label: 'Settings',
    icon: 'heroicons:cog-6-tooth',
  },
];

const isActiveRoute = (path: string, isExact?: boolean) => {
  if (!isClientSide.value) return false;
  return isExact ? route.path === path : route.path.startsWith(path);
};

const getNavLinkClass = (path: string, isExact?: boolean) => {
  const isActive = isActiveRoute(path, isExact);

  return isActive
    ? 'text-white bg-slate-700/50 shadow-lg'
    : 'text-slate-300 hover:text-white hover:bg-slate-700/30';
};

const getIconContainerClass = (path: string, isExact?: boolean) => {
  const isActive = isActiveRoute(path, isExact);

  return isActive
    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
    : 'bg-slate-700/50 text-slate-400 group-hover:bg-slate-600/50 group-hover:text-white';
};
</script>
