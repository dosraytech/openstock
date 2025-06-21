<template>
  <ClientOnly>
    <div class="relative z-50" ref="dropdownRef">
      <button
        @click="isOpen = !isOpen"
        class="flex items-center p-2 text-sm rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <div
          class="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center"
        >
          <span class="text-sm font-medium text-white">
            {{ userInitial }}
          </span>
        </div>
        <span class="hidden sm:block ml-2 text-gray-700">{{
          user?.email || 'User'
        }}</span>
        <Icon
          name="heroicons:chevron-down"
          class="ml-1 h-4 w-4 text-gray-400"
        />
      </button>

      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <div class="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
            Signed in as<br />
            <span class="font-medium text-gray-900">{{
              user?.email || 'User'
            }}</span>
          </div>

          <NuxtLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            @click="isOpen = false"
          >
            <Icon :name="item.icon" class="inline mr-2 h-4 w-4" />
            {{ item.label }}
          </NuxtLink>

          <div class="border-t border-gray-100"></div>
          <button
            @click="handleLogout"
            class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Icon
              name="heroicons:arrow-right-on-rectangle"
              class="inline mr-2 h-4 w-4"
            />
            Sign out
          </button>
        </div>
      </div>
    </div>
    <template #fallback>
      <div class="relative z-50">
        <button
          class="flex items-center p-2 text-sm rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <div
            class="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center"
          >
            <span class="text-sm font-medium text-white">U</span>
          </div>
          <span class="hidden sm:block ml-2 text-gray-700">User</span>
          <Icon
            name="heroicons:chevron-down"
            class="ml-1 h-4 w-4 text-gray-400"
          />
        </button>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
interface MenuItem {
  path: string;
  label: string;
  icon: string;
}

const { user, logout } = useAuthStore();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement>();

const userInitial = computed(() => {
  return user?.email?.charAt(0).toUpperCase() || 'U';
});

const menuItems: MenuItem[] = [
  {
    path: '/dashboard/profile',
    label: 'Your Profile',
    icon: 'heroicons:user-circle',
  },
  {
    path: '/dashboard/settings',
    label: 'Settings',
    icon: 'heroicons:cog-6-tooth',
  },
];

const handleLogout = async () => {
  isOpen.value = false;
  logout();
  await navigateTo('/login');
};

// Click outside detection
const handleClickOutside = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

// Add event listener when dropdown is open
watch(isOpen, (newValue) => {
  if (newValue) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
});

// Cleanup event listener on unmount
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
