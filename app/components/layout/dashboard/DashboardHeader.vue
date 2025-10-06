<template>
  <header class="bg-white shadow-sm border-b border-gray-200 relative z-30">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <button
            @click="$emit('toggleSidebar')"
            class="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
          >
            <Icon name="heroicons:bars-3" class="h-6 w-6" />
          </button>
          <div class="ml-4 lg:ml-0">
            <h1 class="text-xl font-bold text-gray-900">
              {{ title }}
            </h1>
            <div class="flex items-center mt-1">
              <ClientOnly>
                <div class="flex items-center text-xs text-gray-500">
                  <Icon name="heroicons:clock" class="h-3 w-3 mr-1" />
                  {{ currentTime }}
                </div>
                <template #fallback>
                  <div class="flex items-center text-xs text-gray-500">
                    <Icon name="heroicons:clock" class="h-3 w-3 mr-1" />
                    --:--
                  </div>
                </template>
              </ClientOnly>
              <div class="mx-2 text-gray-300">•</div>
              <div class="text-xs text-green-600 font-medium">
                <Icon name="heroicons:signal" class="h-3 w-3 mr-1 inline" />
                System Healthy
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-3">
          <!-- Quick Actions -->
          <div class="flex items-center space-x-2">
            <!-- Notifications -->
            <div class="relative">
              <button
                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 relative"
              >
                <Icon name="heroicons:bell" class="h-5 w-5" :size="20"/>
                <span
                  class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center"
                >
                  <span class="text-xs text-white font-bold">3</span>
                </span>
              </button>
            </div>

            <!-- User menu -->
            <LayoutDashboardUserMenu />
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Access Bar -->
    <div
      class="bg-gradient-to-r from-indigo-50 to-purple-50 border-t border-gray-100 px-4 sm:px-6 lg:px-8 py-2"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <span class="text-xs font-medium text-gray-600">Quick Access:</span>
          <div class="flex items-center space-x-2">
            <NuxtLink
              to="/orders"
              class="inline-flex items-center px-3 py-1 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200"
            >
              <Icon name="heroicons:check-circle" class="h-3 w-3 mr-1" />
              Orders
            </NuxtLink>
            <NuxtLink
              to="/deliveries"
              class="inline-flex items-center px-3 py-1 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200"
            >
              <Icon name="heroicons:users" class="h-3 w-3 mr-1" />
              Deliveries
            </NuxtLink>
            <NuxtLink
              to="/reports"
              class="inline-flex items-center px-3 py-1 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200"
            >
              <Icon name="heroicons:currency-dollar" class="h-3 w-3 mr-1" />
              Reports
            </NuxtLink>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <ClientOnly>
            <div class="text-xs text-gray-500">
              Last sync: {{ lastSyncTime }}
            </div>
            <template #fallback>
              <div class="text-xs text-gray-500">Last sync: --:--</div>
            </template>
          </ClientOnly>
          <button
            class="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Sync Now
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
interface Props {
  title: string;
}

defineProps<Props>();
defineEmits<{
  toggleSidebar: [];
}>();

// Current time
const currentTime = ref('');
const lastSyncTime = ref('');

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Mock last sync time
  const syncTime = new Date(now.getTime() - 5 * 60 * 1000); // 5 minutes ago
  lastSyncTime.value = syncTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Update time every minute
onMounted(() => {
  updateTime();
  setInterval(updateTime, 60000);
});

onUnmounted(() => {
  // Clean up interval if needed
});
</script>
