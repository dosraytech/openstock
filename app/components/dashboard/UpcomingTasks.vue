<template>
  <div
    class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
  >
    <div class="p-6 border-b border-gray-100">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">Upcoming Tasks</h3>
          <p class="text-sm text-gray-500">Tasks due in the next 7 days</p>
        </div>
        <div class="flex items-center space-x-2">
          <div
            class="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-1 rounded-full"
          >
            {{ tasks.length }} pending
          </div>
        </div>
      </div>
    </div>
    <div class="p-6">
      <div class="space-y-3">
        <div
          v-for="task in tasks"
          :key="task.id"
          class="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
        >
          <div class="flex items-center space-x-3">
            <div class="relative">
              <input
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors"
              />
            </div>
            <div class="flex-1">
              <p
                class="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors"
              >
                {{ task.title }}
              </p>
              <div class="flex items-center mt-1 text-xs text-gray-500">
                <Icon name="heroicons:calendar-days" class="h-3 w-3 mr-1" />
                {{ task.dueDate }}
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span
              class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
              :class="task.priorityClass"
            >
              {{ task.priority }}
            </span>
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

      <!-- Task Progress -->
      <div class="mt-6 pt-4 border-t border-gray-100">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-700">Weekly Progress</span>
          <span class="text-sm text-gray-500">3 of 8 completed</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full shadow-sm"
            style="width: 37.5%"
          ></div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mt-6 flex space-x-2">
        <button
          class="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
        >
          <Icon name="heroicons:plus" class="h-4 w-4 mr-1" />
          Add Task
        </button>
        <button
          class="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          View All
          <Icon name="heroicons:arrow-right" class="ml-1 h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Task {
  id: number;
  title: string;
  dueDate: string;
  priority: string;
  priorityClass: string;
}

defineProps<{
  tasks: Task[];
}>();
</script>
