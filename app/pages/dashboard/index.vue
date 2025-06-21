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
          <!-- Notifications -->
          <button
            class="relative p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <Icon name="heroicons:bell" class="h-5 w-5 text-gray-600" />
            <div
              class="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"
            ></div>
          </button>
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
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

          <!-- Recent Activity -->
          <DashboardRecentActivity :activities="recentActivity" />
        </div>

        <!-- Right Column: Quick Actions and Tasks -->
        <div class="space-y-6">
          <!-- Quick Actions -->
          <DashboardQuickActions />

          <!-- Category Distribution Chart -->
          <ClientOnly fallback-tag="div">
            <DashboardDonutChart />
            <template #fallback>
              <div
                class="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <div class="animate-pulse">
                  <div class="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div class="h-48 bg-gray-200 rounded"></div>
                </div>
              </div>
            </template>
          </ClientOnly>

          <!-- Upcoming Tasks -->
          <DashboardUpcomingTasks :tasks="upcomingTasks" />

          <!-- Todo List -->
          <DashboardTodoList
            :todos="todos"
            @toggle-todo="handleToggleTodo"
            @edit-todo="handleEditTodo"
            @delete-todo="handleDeleteTodo"
            @add-todo="handleAddTodo"
          />

          <!-- Inventory Categories -->
          <DashboardPipelineStatus :categories="inventoryCategories" />
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
const { stats, recentActivity, upcomingTasks, inventoryCategories } =
  useDashboard();

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
const todos = ref<Todo[]>([]);
const loading = ref(false);

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
    fetchTodos();
  });
}

// Todo handler methods
const handleToggleTodo = async (id: string) => {
  try {
    const todo = todos.value?.find((t) => t.id === id);
    if (!todo) return;

    const updatedTodo = await $fetch<Todo>(`/api/todos/${id}`, {
      method: 'PUT',
      body: {
        ...todo,
        completed: !todo.completed,
      },
    });

    // Update local state
    const index = todos.value?.findIndex((t) => t.id === id);
    if (index !== undefined && index > -1 && todos.value) {
      todos.value[index] = updatedTodo;
    }
  } catch (error) {
    console.error('Failed to toggle todo:', error);
  }
};

const handleEditTodo = (todo: Todo) => {
  // Navigate to todos page with edit mode
  navigateTo(`/dashboard/todos?edit=${todo.id}`);
};

const handleDeleteTodo = async (id: string) => {
  if (confirm('Are you sure you want to delete this todo?')) {
    try {
      await $fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      // Remove from local state
      const index = todos.value?.findIndex((t) => t.id === id);
      if (index !== undefined && index > -1 && todos.value) {
        todos.value.splice(index, 1);
      }
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  }
};

const handleAddTodo = () => {
  // Navigate to todos page
  navigateTo('/dashboard/todos');
};
</script>
