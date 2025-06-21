<template>
  <div
    class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
  >
    <div class="p-6 border-b border-gray-100">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">Recent Activity</h3>
          <p class="text-sm text-gray-500">Latest updates from your team</p>
        </div>
        <div class="flex items-center space-x-2">
          <div class="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span class="text-xs font-medium text-green-600">Live</span>
        </div>
      </div>
    </div>
    <div class="p-6">
      <div class="space-y-4">
        <div
          v-for="activity in activities"
          :key="activity.id"
          class="group flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <div class="flex-shrink-0 relative">
            <div
              class="h-8 w-8 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm"
              :class="activity.bgColor"
            >
              <Icon
                :name="activity.icon"
                class="h-4 w-4"
                :class="activity.iconColor"
              />
            </div>
            <!-- Timeline connector -->
            <div
              class="absolute top-8 left-1/2 transform -translate-x-1/2 w-px h-6 bg-gray-200 group-last:hidden"
            ></div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <p
                  class="text-sm font-medium text-gray-900 group-hover:text-gray-700"
                >
                  {{ activity.description }}
                </p>
                <div class="flex items-center mt-1 text-xs text-gray-500">
                  <Icon name="heroicons:clock" class="h-3 w-3 mr-1" />
                  {{ activity.time }}
                </div>
              </div>
              <button
                class="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded-md"
              >
                <Icon
                  name="heroicons:ellipsis-horizontal"
                  class="h-4 w-4 text-gray-400"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Summary -->
      <div class="mt-6 pt-4 border-t border-gray-100">
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <p class="text-lg font-bold text-gray-900">47</p>
            <p class="text-xs text-gray-500">Today</p>
          </div>
          <div>
            <p class="text-lg font-bold text-gray-900">312</p>
            <p class="text-xs text-gray-500">This Week</p>
          </div>
          <div>
            <p class="text-lg font-bold text-gray-900">892</p>
            <p class="text-xs text-gray-500">This Month</p>
          </div>
        </div>
      </div>

      <div class="mt-4 text-center">
        <button
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
        >
          View all activity
          <Icon name="heroicons:arrow-right" class="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Activity {
  id: number;
  description: string;
  time: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

defineProps<{
  activities: Activity[];
}>();
</script>
