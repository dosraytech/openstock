<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
  >
    <!-- Header -->
    <div class="mb-8 px-6 pt-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Todo Management</h1>
          <p class="text-gray-600 flex items-center">
            <Icon name="heroicons:check-circle" class="h-4 w-4 mr-2" />
            Organize your tasks and boost productivity
          </p>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <div class="relative">
            <Icon
              name="heroicons:magnifying-glass"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search todos..."
              class="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm w-64"
            />
          </div>
          <!-- Add Todo Button -->
          <button
            @click="showAddModal = true"
            class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Icon name="heroicons:plus" class="h-4 w-4 mr-2" />
            Add Todo
          </button>
        </div>
      </div>
    </div>

    <div class="px-6 space-y-6">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div
                class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"
              >
                <Icon
                  name="heroicons:list-bullet"
                  class="h-6 w-6 text-blue-600"
                />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Tasks</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalTodos }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div
                class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"
              >
                <Icon
                  name="heroicons:check-circle"
                  class="h-6 w-6 text-green-600"
                />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Completed</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ completedTodos }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div
                class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center"
              >
                <Icon name="heroicons:clock" class="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Pending</p>
              <p class="text-2xl font-bold text-gray-900">{{ pendingTodos }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div
                class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center"
              >
                <Icon
                  name="heroicons:exclamation-triangle"
                  class="h-6 w-6 text-red-600"
                />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Overdue</p>
              <p class="text-2xl font-bold text-gray-900">{{ overdueTodos }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter and Sort -->
      <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-gray-700">Filter:</label>
              <select
                v-model="currentFilter"
                class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-gray-700">Priority:</label>
              <select
                v-model="priorityFilter"
                class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          <div class="text-sm text-gray-500">
            {{ filteredTodos.length }} of {{ totalTodos }} tasks
          </div>
        </div>
      </div>

      <!-- Todos List -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-100">
        <div class="p-6 border-b border-gray-100">
          <h3 class="text-lg font-bold text-gray-900">Your Tasks</h3>
        </div>
        <div class="divide-y divide-gray-100">
          <div
            v-for="todo in filteredTodos"
            :key="todo.id"
            class="p-6 hover:bg-gray-50 transition-colors group"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4 flex-1">
                <input
                  type="checkbox"
                  :checked="todo.completed"
                  @change="toggleTodo(todo.id)"
                  class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors"
                />
                <div class="flex-1">
                  <h4
                    class="text-lg font-medium transition-colors"
                    :class="
                      todo.completed
                        ? 'text-gray-500 line-through'
                        : 'text-gray-900 group-hover:text-indigo-600'
                    "
                  >
                    {{ todo.title }}
                  </h4>
                  <p class="text-sm text-gray-500 mt-1">
                    {{ todo.description }}
                  </p>
                  <div class="flex items-center mt-2 space-x-4">
                    <div class="flex items-center text-xs text-gray-500">
                      <Icon
                        name="heroicons:calendar-days"
                        class="h-4 w-4 mr-1"
                      />
                      {{ formatDate(todo.dueDate) }}
                    </div>
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getPriorityClass(todo.priority)"
                    >
                      {{ todo.priority }}
                    </span>
                    <span
                      v-if="todo.category"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {{ todo.category }}
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <button
                  @click="editTodo(todo)"
                  class="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Icon name="heroicons:pencil" class="h-4 w-4" />
                </button>
                <button
                  @click="deleteTodo(todo.id)"
                  class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Icon name="heroicons:trash" class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <div v-if="filteredTodos.length === 0" class="p-12 text-center">
            <Icon
              name="heroicons:clipboard-document-list"
              class="h-16 w-16 text-gray-300 mx-auto mb-4"
            />
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              No tasks found
            </h3>
            <p class="text-gray-500 mb-4">
              Get started by creating your first todo.
            </p>
            <button
              @click="showAddModal = true"
              class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Icon name="heroicons:plus" class="h-4 w-4 mr-2" />
              Add Your First Todo
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Todo Modal -->
    <div
      v-if="showAddModal || editingTodo"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click="closeModal"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="p-2 bg-white/20 rounded-lg mr-3">
                <Icon
                  :name="
                    editingTodo ? 'heroicons:pencil-square' : 'heroicons:plus'
                  "
                  class="h-5 w-5 text-white"
                />
              </div>
              <h3 class="text-xl font-semibold text-white">
                {{ editingTodo ? 'Edit Todo' : 'Add New Todo' }}
              </h3>
            </div>
            <button
              @click="closeModal"
              class="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Icon name="heroicons:x-mark" class="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        <!-- Modal Body -->
        <form @submit.prevent="saveTodo" class="p-6">
          <div class="space-y-5">
            <!-- Title -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <Icon
                  name="heroicons:check-circle"
                  class="inline h-4 w-4 mr-1"
                />
                Task Title
              </label>
              <input
                v-model="todoForm.title"
                type="text"
                required
                placeholder="e.g., Review quarterly reports"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <Icon
                  name="heroicons:document-text"
                  class="inline h-4 w-4 mr-1"
                />
                Description
                <span class="text-xs text-gray-500">(optional)</span>
              </label>
              <textarea
                v-model="todoForm.description"
                rows="2"
                placeholder="Add more details about this task..."
                class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
              ></textarea>
            </div>

            <!-- Date & Priority Row -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <Icon
                    name="heroicons:calendar-days"
                    class="inline h-4 w-4 mr-1"
                  />
                  Due Date
                  <span class="text-xs text-gray-500">(optional)</span>
                </label>
                <input
                  v-model="todoForm.dueDate"
                  type="date"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <Icon
                    name="heroicons:exclamation-triangle"
                    class="inline h-4 w-4 mr-1"
                  />
                  Priority
                </label>
                <select
                  v-model="todoForm.priority"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
                >
                  <option value="low">🟢 Low Priority</option>
                  <option value="medium">🟡 Medium Priority</option>
                  <option value="high">🔴 High Priority</option>
                </select>
              </div>
            </div>

            <!-- Category -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <Icon name="heroicons:tag" class="inline h-4 w-4 mr-1" />
                Category
                <span class="text-xs text-gray-500">(optional)</span>
              </label>
              <input
                v-model="todoForm.category"
                type="text"
                placeholder="e.g., Work, Personal, Projects"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <!-- Modal Footer -->
          <div
            class="flex justify-between items-center pt-6 mt-6 border-t border-gray-200"
          >
            <div class="text-sm text-gray-500">
              <Icon
                name="heroicons:information-circle"
                class="inline h-4 w-4 mr-1"
              />
              Keep track of your tasks and stay organized
            </div>
            <div class="flex space-x-3">
              <button
                type="button"
                @click="closeModal"
                class="px-5 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all font-medium shadow-lg hover:shadow-xl flex items-center"
              >
                <Icon
                  v-if="loading"
                  name="heroicons:arrow-path"
                  class="h-4 w-4 mr-2 animate-spin"
                />
                <Icon
                  v-else
                  :name="editingTodo ? 'heroicons:check' : 'heroicons:plus'"
                  class="h-4 w-4 mr-2"
                />
                {{
                  loading
                    ? 'Saving...'
                    : editingTodo
                    ? 'Update Todo'
                    : 'Add Todo'
                }}
              </button>
            </div>
          </div>
        </form>
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
  title: 'Todos - OpenStock',
  meta: [
    {
      name: 'description',
      content:
        'Manage your todos and tasks efficiently with OpenStock inventory system.',
    },
  ],
});

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

// Reactive state
const searchQuery = ref('');
const currentFilter = ref('all');
const priorityFilter = ref('all');
const showAddModal = ref(false);
const editingTodo = ref<Todo | null>(null);
const loading = ref(false);

const todoForm = ref({
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium' as 'low' | 'medium' | 'high',
  category: '',
});

// Real todos data from API
const todos = ref<Todo[]>([]);

// Computed properties
const totalTodos = computed(() => todos.value.length);
const completedTodos = computed(
  () => todos.value.filter((todo) => todo.completed).length
);
const pendingTodos = computed(
  () => todos.value.filter((todo) => !todo.completed).length
);
const overdueTodos = computed(() => {
  const today = new Date().toISOString().split('T')[0]!;
  return todos.value.filter((todo) => !todo.completed && todo.dueDate < today)
    .length;
});

const filteredTodos = computed(() => {
  let filtered = [...todos.value];

  // Apply search filter
  if (searchQuery.value) {
    filtered = filtered.filter(
      (todo) =>
        todo.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Apply status filter
  if (currentFilter.value !== 'all') {
    if (currentFilter.value === 'completed') {
      filtered = filtered.filter((todo) => todo.completed);
    } else if (currentFilter.value === 'pending') {
      filtered = filtered.filter((todo) => !todo.completed);
    } else if (currentFilter.value === 'overdue') {
      const today = new Date().toISOString().split('T')[0]!;
      filtered = filtered.filter(
        (todo) => !todo.completed && todo.dueDate < today
      );
    }
  }

  // Apply priority filter
  if (priorityFilter.value !== 'all') {
    filtered = filtered.filter(
      (todo) => todo.priority === priorityFilter.value
    );
  }

  return filtered;
});

// API Methods
const fetchTodos = async () => {
  try {
    loading.value = true;
    const data = await $fetch<Todo[]>('/api/todos');
    todos.value = data;
  } catch (error) {
    console.error('Failed to fetch todos:', error);
  } finally {
    loading.value = false;
  }
};

const toggleTodo = async (id: string) => {
  try {
    const todo = todos.value.find((t) => t.id === id);
    if (!todo) return;

    const updatedTodo = await $fetch<Todo>(`/api/todos/${id}`, {
      method: 'PUT',
      body: {
        ...todo,
        completed: !todo.completed,
      },
    });

    // Update local state
    const index = todos.value.findIndex((t) => t.id === id);
    if (index > -1) {
      todos.value[index] = updatedTodo;
    }
  } catch (error) {
    console.error('Failed to toggle todo:', error);
  }
};

const editTodo = (todo: Todo) => {
  editingTodo.value = todo;
  todoForm.value = {
    title: todo.title,
    description: todo.description,
    dueDate: todo.dueDate,
    priority: todo.priority,
    category: todo.category,
  };
};

const deleteTodo = async (id: string) => {
  if (confirm('Are you sure you want to delete this todo?')) {
    try {
      await $fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      // Remove from local state
      const index = todos.value.findIndex((t) => t.id === id);
      if (index > -1) {
        todos.value.splice(index, 1);
      }
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  }
};

const saveTodo = async () => {
  if (!todoForm.value.title.trim()) return;

  try {
    loading.value = true;

    if (editingTodo.value) {
      // Update existing todo
      const updatedTodo = await $fetch<Todo>(
        `/api/todos/${editingTodo.value.id}`,
        {
          method: 'PUT',
          body: todoForm.value,
        }
      );

      // Update local state
      const index = todos.value.findIndex(
        (t) => t.id === editingTodo.value!.id
      );
      if (index > -1) {
        todos.value[index] = updatedTodo;
      }
    } else {
      // Add new todo
      const newTodo = await $fetch<Todo>('/api/todos', {
        method: 'POST',
        body: todoForm.value,
      });

      todos.value.unshift(newTodo);
    }

    closeModal();
  } catch (error) {
    console.error('Failed to save todo:', error);
  } finally {
    loading.value = false;
  }
};

const closeModal = () => {
  showAddModal.value = false;
  editingTodo.value = null;
  todoForm.value = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    category: '',
  };
};

const formatDate = (dateString: string) => {
  if (!dateString) return 'No date';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const getPriorityClass = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Initialize data on mount
onMounted(() => {
  fetchTodos();
});
</script>
