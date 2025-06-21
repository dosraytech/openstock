<template>
  <div
    class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
  >
    <div class="p-6 border-b border-gray-100">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">Quick Todos</h3>
          <p class="text-sm text-gray-500">Your most important tasks</p>
        </div>
        <div class="flex items-center space-x-2">
          <div
            class="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded-full"
          >
            {{ pendingCount }} active
          </div>
          <button
            @click="$emit('add-todo')"
            class="text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <Icon name="heroicons:plus-circle" class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>

    <div class="p-6">
      <div class="space-y-3 max-h-80 overflow-y-auto">
        <div
          v-for="todo in displayTodos"
          :key="todo.id"
          class="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
        >
          <div class="flex items-center space-x-3 flex-1">
            <div class="relative">
              <input
                type="checkbox"
                :checked="todo.completed"
                @change="$emit('toggle-todo', todo.id)"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors"
              />
            </div>
            <div class="flex-1 min-w-0">
              <p
                class="text-sm font-medium transition-colors truncate"
                :class="
                  todo.completed
                    ? 'text-gray-500 line-through'
                    : 'text-gray-900 group-hover:text-indigo-600'
                "
              >
                {{ todo.title }}
              </p>
              <div
                class="flex items-center mt-1 text-xs text-gray-500 space-x-2"
              >
                <div class="flex items-center">
                  <Icon name="heroicons:calendar-days" class="h-3 w-3 mr-1" />
                  {{ formatDate(todo.dueDate) }}
                </div>
                <span
                  class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getPriorityClass(todo.priority)"
                >
                  {{ todo.priority }}
                </span>
              </div>
            </div>
          </div>
          <div
            class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <button
              @click="$emit('edit-todo', todo)"
              class="p-1 hover:bg-gray-200 rounded-md transition-colors"
            >
              <Icon name="heroicons:pencil" class="h-3 w-3 text-gray-400" />
            </button>
            <button
              @click="$emit('delete-todo', todo.id)"
              class="p-1 hover:bg-red-100 rounded-md transition-colors"
            >
              <Icon name="heroicons:trash" class="h-3 w-3 text-red-400" />
            </button>
          </div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="mt-6 pt-4 border-t border-gray-100">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-700"
            >Today's Progress</span
          >
          <span class="text-sm text-gray-500"
            >{{ completedCount }} of {{ totalCount }} completed</span
          >
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full shadow-sm transition-all duration-500"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mt-6 flex space-x-2">
        <button
          @click="$emit('add-todo')"
          class="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
        >
          <Icon name="heroicons:plus" class="h-4 w-4 mr-1" />
          Quick Add
        </button>
        <NuxtLink
          to="/dashboard/todos"
          class="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          View All
          <Icon name="heroicons:arrow-right" class="ml-1 h-4 w-4" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

interface Props {
  todos: Todo[];
  maxDisplay?: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxDisplay: 5,
});

defineEmits<{
  'toggle-todo': [id: string];
  'edit-todo': [todo: Todo];
  'delete-todo': [id: string];
  'add-todo': [];
}>();

// Computed properties
const displayTodos = computed(() => {
  return props.todos.slice(0, props.maxDisplay).sort((a, b) => {
    // Sort by completed status (incomplete first), then by priority, then by due date
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    const priorityOrder = { high: 3, medium: 2, low: 1 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }

    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
});

const totalCount = computed(() => props.todos.length);
const completedCount = computed(
  () => props.todos.filter((todo) => todo.completed).length
);
const pendingCount = computed(
  () => props.todos.filter((todo) => !todo.completed).length
);

const progressPercentage = computed(() => {
  return totalCount.value > 0
    ? Math.round((completedCount.value / totalCount.value) * 100)
    : 0;
});

// Methods
const formatDate = (dateString: string) => {
  if (!dateString) return 'No date';
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
  if (diffDays < -1 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

const getPriorityClass = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-700';
    case 'medium':
      return 'bg-yellow-100 text-yellow-700';
    case 'low':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};
</script>
