<template>
  <div
    class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
  >
    <div class="p-6 border-b border-gray-100">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">
            Inventory Categories
          </h3>
          <p class="text-sm text-gray-500">Products by category</p>
        </div>
        <div class="p-2 bg-purple-50 rounded-lg">
          <Icon name="heroicons:squares-2x2" class="h-5 w-5 text-purple-600" />
        </div>
      </div>
    </div>
    <div class="p-6">
      <div class="space-y-4">
        <div
          v-for="category in categories"
          :key="category.name"
          class="group p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center space-x-3">
              <div
                class="w-4 h-4 rounded-full shadow-sm"
                :class="category.color"
              ></div>
              <span class="text-sm font-semibold text-gray-900">{{
                category.name
              }}</span>
            </div>
            <div class="text-right">
              <div class="text-sm font-bold text-gray-900">
                €{{ category.value.toLocaleString() }}
              </div>
              <div class="text-xs text-gray-500">
                {{ category.count }} products
              </div>
            </div>
          </div>
          <!-- Category Progress Bar -->
          <div class="w-full bg-gray-200 rounded-full h-1.5">
            <div
              class="h-1.5 rounded-full shadow-sm"
              :class="category.color"
              :style="`width: ${Math.min(
                (category.value / 50000) * 100,
                100
              )}%`"
            ></div>
          </div>
        </div>
      </div>

      <!-- Category Summary -->
      <div class="mt-6 pt-4 border-t border-gray-100">
        <div class="grid grid-cols-2 gap-4">
          <div class="text-center">
            <p class="text-lg font-bold text-gray-900">8</p>
            <p class="text-xs text-gray-500">Total Categories</p>
          </div>
          <div class="text-center">
            <p class="text-lg font-bold text-gray-900">€284K</p>
            <p class="text-xs text-gray-500">Total Value</p>
          </div>
        </div>
      </div>

      <div class="mt-6 flex space-x-2">
        <button
          class="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200"
        >
          <Icon name="heroicons:plus" class="h-4 w-4 mr-1" />
          Add Category
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
interface InventoryCategory {
  name: string;
  count: number;
  value: number;
  color: string;
}

defineProps<{
  categories: InventoryCategory[];
}>();
</script>
