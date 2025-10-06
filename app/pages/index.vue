<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
  >
    <!-- Enhanced Dashboard Header -->
    <div class="mb-8 px-6 pt-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Overview
          </h1>
          <p class="text-gray-600 flex items-center">
            <Icon name="heroicons:calendar-days" class="h-4 w-4 mr-2" />
            Welcome back! Here's what's happening with your inventory today.
          </p>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Filter Dropdown -->
          <select
            v-model="selectedShop"
            class="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          >
            <option value="">All Categories</option>
            <option
              v-for="shop in shops"
              :key="shop.id"
              :value="shop.id"
            >
              {{ shop.name }}
            </option>
          </select>
          <!-- Quick Search -->
          <div class="relative">
            <Icon
              name="heroicons:magnifying-glass"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search..."
              class="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
          
          <!-- Export Button -->
          <button
            class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Icon name="heroicons:arrow-down-tray" class="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>
    </div>

    <div class="px-6 space-y-6">
      <!-- Dashboard Stats -->
      <DashboardStatsCards :stats="stats" />

      <!-- Main Content Grid - 3 columns for better space utilization -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Left Column: Charts -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Stock Levels Chart -->
          <ClientOnly fallback-tag="div">
            <DashboardSalesChart />
            <template #fallback>
              <div
                class="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <div class="animate-pulse">
                  <div class="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div class="h-64 bg-gray-200 rounded"></div>
                </div>
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Left Column: Charts -->
        <div class="lg:col-span-2 space-y-6 mb-8">
          <!-- Recent Activity -->
          <DashboardDonutChart />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Set layout and middleware
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

// Set page meta
useHead({
  title: 'Dashboard - Inventory Management',
  meta: [
    {
      name: 'description',
      content:
        'Inventory management dashboard with stock overview, suppliers, and analytics.',
    },
  ],
});

// Use dashboard composable for data
const { stats } = useDashboard();

// Shop Interface
interface Shop {
  id: string;
  name: string;
}

// Todo interface
interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  created: string;
  updated: string;
}

// Real todos data from API
const shops = ref<Shop[]>([]);
const todos = ref<Todo[]>([]);
const loading = ref(false);

const selectedShop = ref('');

// Fetch todos from API
const fetchShops = async () => {
  try {
    loading.value = true;
    const data = await $fetch<Shop[]>('/api/shops');
    shops.value = data || [];
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    todos.value = [];
  } finally {
    loading.value = false;
  }
};

// Fetch todos from API
const fetchTodos = async () => {
  try {
    loading.value = true;
    const data = await $fetch<Todo[]>('/api/todos');
    todos.value = data || [];
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    todos.value = [];
  } finally {
    loading.value = false;
  }
};

// Use import.meta.client to ensure this only runs on client side
if (import.meta.client) {
  onMounted(() => {
    // fetchTodos();
    fetchShops();
  });
}

</script>
