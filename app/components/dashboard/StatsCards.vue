<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    <!-- Total Products Card -->
    <div
      class="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200/50"
    >
      <div
        class="absolute top-0 right-0 w-20 h-20 bg-blue-500 rounded-bl-full opacity-10"
      ></div>
      <div class="p-6 relative">
        <div class="flex items-center justify-between mb-4">
          <div
            class="p-3 flex items-center justify-center bg-blue-500 rounded-xl shadow-lg"
          >
            <Icon name="heroicons:cube" class="h-6 w-6 text-white" />
          </div>
          <div class="text-right">
            <div
              class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800"
            >
              <Icon name="heroicons:arrow-trending-up" class="h-3 w-3 mr-1" />
              +5%
            </div>
          </div>
        </div>
        <div class="space-y-1">
          <p class="text-sm font-medium text-blue-600 uppercase tracking-wider">
            Total Products
          </p>
          <p class="text-3xl font-bold text-gray-900">
            {{ stats.totalProducts }}
          </p>
          <div class="w-full bg-blue-200 rounded-full h-1.5">
            <div
              class="bg-blue-500 h-1.5 rounded-full"
              style="width: 75%"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Low Stock Items Card -->
    <div
      class="relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-red-200/50"
    >
      <div
        class="absolute top-0 right-0 w-20 h-20 bg-red-500 rounded-bl-full opacity-10"
      ></div>
      <div class="p-6 relative">
        <div class="flex items-center justify-between mb-4">
          <div
            class="p-3 flex items-center justify-center bg-red-500 rounded-xl shadow-lg"
          >
            <Icon
              name="heroicons:exclamation-triangle"
              class="h-6 w-6 text-white"
            />
          </div>
          <div class="text-right">
            <div
              class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800"
            >
              <Icon name="heroicons:arrow-trending-down" class="h-3 w-3 mr-1" />
              Critical
            </div>
          </div>
        </div>
        <div class="space-y-1">
          <p class="text-sm font-medium text-red-600 uppercase tracking-wider">
            Low Stock Items
          </p>
          <p class="text-3xl font-bold text-gray-900">
            {{ stats.lowStockItems }}
          </p>
          <div class="w-full bg-red-200 rounded-full h-1.5">
            <div class="bg-red-500 h-1.5 rounded-full" style="width: 45%"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Total Inventory Value Card -->
    <div
      class="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-200/50"
    >
      <div
        class="absolute top-0 right-0 w-20 h-20 bg-green-500 rounded-bl-full opacity-10"
      ></div>
      <div class="p-6 relative">
        <div class="flex items-center justify-between mb-4">
          <div
            class="p-3 flex items-center justify-center bg-green-500 rounded-xl shadow-lg"
          >
            <Icon name="heroicons:currency-euro" class="h-6 w-6 text-white" />
          </div>
          <div class="text-right">
            <div
              class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800"
            >
              <Icon name="heroicons:arrow-trending-up" class="h-3 w-3 mr-1" />
              +8%
            </div>
          </div>
        </div>
        <div class="space-y-1">
          <p
            class="text-sm font-medium text-green-600 uppercase tracking-wider"
          >
            Inventory Value
          </p>
          <p class="text-3xl font-bold text-gray-900">
            €{{ stats.totalValue.toLocaleString() }}
          </p>
          <div class="w-full bg-green-200 rounded-full h-1.5">
            <div
              class="bg-green-500 h-1.5 rounded-full"
              style="width: 85%"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pending Orders Card -->
    <div
      class="relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-200/50"
    >
      <div
        class="absolute top-0 right-0 w-20 h-20 bg-orange-500 rounded-bl-full opacity-10"
      ></div>
      <div class="p-6 relative">
        <div class="flex items-center justify-between mb-4">
          <div
            class="p-3 flex items-center justify-center bg-orange-500 rounded-xl shadow-lg"
          >
            <Icon name="heroicons:truck" class="h-6 w-6 text-white" />
          </div>
          <div class="text-right">
            <div
              class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800"
            >
              <Icon name="heroicons:clock" class="h-3 w-3 mr-1" />
              2 new
            </div>
          </div>
        </div>
        <div class="space-y-1">
          <p
            class="text-sm font-medium text-orange-600 uppercase tracking-wider"
          >
            Pending Orders
          </p>
          <p class="text-3xl font-bold text-gray-900">
            {{ stats.pendingOrders }}
          </p>
          <div class="w-full bg-orange-200 rounded-full h-1.5">
            <div
              class="bg-orange-500 h-1.5 rounded-full"
              style="width: 60%"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Stats {
  totalProducts: number;
  lowStockItems: number;
  totalValue: number;
  pendingOrders: number;
}

defineProps<{
  stats: Stats;
}>();
</script>
