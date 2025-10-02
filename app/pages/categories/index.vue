<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
  >
    <!-- Page Header -->
    <div class="mb-8 px-6 pt-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Categories Management
          </h1>
          <p class="text-gray-600 flex items-center">
            <Icon name="heroicons:tag" class="h-4 w-4 mr-2" />
            Organize your inventory with categories and subcategories
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
              placeholder="Search categories..."
              class="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
          <!-- Add Category Button -->
          <button
            @click="openAddModal"
            class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Icon name="heroicons:plus" class="h-4 w-4 mr-2" />
            Add Category
          </button>
        </div>
      </div>
    </div>

    <div class="px-6">
      <!-- Categories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="category in filteredCategories"
          :key="category.id"
          class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center">
              <div
                :class="[
                  'h-12 w-12 rounded-lg flex items-center justify-center text-white text-xl font-bold',
                  category.color,
                ]"
              >
                {{ category.name.charAt(0).toUpperCase() }}
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ category.name }}
                </h3>
                <p class="text-sm text-gray-500">{{ category.code }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="editCategory(category)"
                class="text-gray-400 hover:text-indigo-600 p-1 rounded hover:bg-indigo-50"
              >
                <Icon name="heroicons:pencil" class="h-4 w-4" />
              </button>
              <button
                @click="deleteCategory(category.id)"
                class="text-gray-400 hover:text-red-600 p-1 rounded hover:bg-red-50"
              >
                <Icon name="heroicons:trash" class="h-4 w-4" />
              </button>
            </div>
          </div>

          <p class="text-gray-600 text-sm mb-4">{{ category.description }}</p>

          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="text-sm">
                <span class="text-gray-500">Created:</span>
                <span class="font-medium text-gray-900 ml-1">{{
                  new Date(category.created).toLocaleDateString()
                }}</span>
              </div>
              <div class="text-sm">
                <span class="text-gray-500">Active:</span>
                <span
                  :class="[
                    'font-medium ml-1',
                    category.isActive ? 'text-green-600' : 'text-red-600',
                  ]"
                >
                  {{ category.isActive ? 'Yes' : 'No' }}
                </span>
              </div>
            </div>
            <button
              @click="toggleCategoryStatus(category.id)"
              :class="[
                'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors',
                category.isActive
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-red-100 text-red-800 hover:bg-red-200',
              ]"
            >
              {{ category.isActive ? 'Active' : 'Inactive' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Category Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click="closeModal"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-hidden"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="p-2 bg-white/20 rounded-lg mr-3">
                <Icon
                  :name="
                    editingCategory
                      ? 'heroicons:pencil-square'
                      : 'heroicons:plus'
                  "
                  class="h-5 w-5 text-white"
                />
              </div>
              <h3 class="text-xl font-semibold text-white">
                {{ editingCategory ? 'Edit Category' : 'Add New Category' }}
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
        <form @submit.prevent="saveCategory" class="p-6">
          <div class="space-y-5">
            <!-- Basic Info Row -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <Icon name="heroicons:tag" class="inline h-4 w-4 mr-1" />
                  Category Name
                </label>
                <input
                  v-model="categoryForm.name"
                  type="text"
                  required
                  placeholder="e.g., Electronics"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <Icon name="heroicons:hashtag" class="inline h-4 w-4 mr-1" />
                  Category Code
                </label>
                <input
                  v-model="categoryForm.code"
                  type="text"
                  required
                  placeholder="e.g., ELEC"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
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
                v-model="categoryForm.description"
                rows="2"
                placeholder="Brief description of this category..."
                class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
              ></textarea>
            </div>

            <!-- Color & Status Row -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <Icon name="heroicons:swatch" class="inline h-4 w-4 mr-1" />
                  Color Theme
                </label>
                <select
                  v-model="categoryForm.color"
                  required
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
                >
                  <option value="">Select Color</option>
                  <option value="bg-blue-500">🔵 Blue</option>
                  <option value="bg-green-500">🟢 Green</option>
                  <option value="bg-red-500">🔴 Red</option>
                  <option value="bg-yellow-500">🟡 Yellow</option>
                  <option value="bg-purple-500">🟣 Purple</option>
                  <option value="bg-pink-500">🩷 Pink</option>
                  <option value="bg-indigo-500">🟦 Indigo</option>
                  <option value="bg-orange-500">🟠 Orange</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <Icon
                    name="heroicons:check-circle"
                    class="inline h-4 w-4 mr-1"
                  />
                  Status
                </label>
                <div class="flex items-center h-[42px]">
                  <label class="flex items-center cursor-pointer">
                    <input
                      v-model="categoryForm.isActive"
                      type="checkbox"
                      class="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-2"
                    />
                    <span class="ml-3 text-sm font-medium text-gray-700">
                      {{ categoryForm.isActive ? 'Active' : 'Inactive' }}
                    </span>
                  </label>
                </div>
              </div>
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
              Categories help organize your inventory items
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
                  :name="editingCategory ? 'heroicons:check' : 'heroicons:plus'"
                  class="h-4 w-4 mr-2"
                />
                {{
                  loading
                    ? 'Saving...'
                    : editingCategory
                    ? 'Update Category'
                    : 'Add Category'
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
  title: 'Categories - Inventory Management',
  meta: [
    {
      name: 'description',
      content: 'Manage inventory categories and organization structure.',
    },
  ],
});

// Category interface
interface Category {
  id: string;
  name: string;
  code: string;
  description: string;
  color: string;
  isActive: boolean;
  created: string;
  updated: string;
}

// Reactive data
const searchQuery = ref('');
const showModal = ref(false);
const editingCategory = ref<Category | null>(null);
const loading = ref(false);

// Real categories data from API
const categories = ref<Category[]>([]);

// Category form
const categoryForm = ref({
  name: '',
  code: '',
  description: '',
  color: '',
  isActive: true,
});

// Computed
const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories.value;

  const query = searchQuery.value.toLowerCase();
  return categories.value.filter(
    (category) =>
      category.name.toLowerCase().includes(query) ||
      category.code.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query)
  );
});

// API Methods
const fetchCategories = async () => {
  try {
    loading.value = true;
    const data = await $fetch<Category[]>('/api/categories');
    categories.value = data;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  } finally {
    loading.value = false;
  }
};

const openAddModal = () => {
  editingCategory.value = null;
  categoryForm.value = {
    name: '',
    code: '',
    description: '',
    color: '',
    isActive: true,
  };
  showModal.value = true;
};

const editCategory = (category: Category) => {
  editingCategory.value = category;
  categoryForm.value = {
    name: category.name,
    code: category.code,
    description: category.description,
    color: category.color,
    isActive: category.isActive,
  };
  showModal.value = true;
};

const saveCategory = async () => {
  try {
    loading.value = true;

    if (editingCategory.value) {
      // Update existing category
      const updatedCategory = await $fetch<Category>(
        `/api/categories/${editingCategory.value.id}`,
        {
          method: 'PUT',
          body: categoryForm.value,
        }
      );

      // Update local state
      const index = categories.value.findIndex(
        (c) => c.id === editingCategory.value!.id
      );
      if (index > -1) {
        categories.value[index] = updatedCategory;
      }
    } else {
      // Add new category
      const newCategory = await $fetch<Category>('/api/categories', {
        method: 'POST',
        body: categoryForm.value,
      });

      categories.value.unshift(newCategory);
    }

    closeModal();
  } catch (error) {
    console.error('Failed to save category:', error);
  } finally {
    loading.value = false;
  }
};

const deleteCategory = async (id: string) => {
  if (confirm('Are you sure you want to delete this category?')) {
    try {
      await $fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });

      // Remove from local state
      const index = categories.value.findIndex((c) => c.id === id);
      if (index > -1) {
        categories.value.splice(index, 1);
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  }
};

const toggleCategoryStatus = async (id: string) => {
  try {
    const category = categories.value.find((c) => c.id === id);
    if (!category) return;

    const updatedCategory = await $fetch<Category>(`/api/categories/${id}`, {
      method: 'PUT',
      body: {
        ...category,
        isActive: !category.isActive,
      },
    });

    // Update local state
    const index = categories.value.findIndex((c) => c.id === id);
    if (index > -1) {
      categories.value[index] = updatedCategory;
    }
  } catch (error) {
    console.error('Failed to toggle category status:', error);
  }
};

const closeModal = () => {
  showModal.value = false;
  editingCategory.value = null;
};

// Initialize data on mount
onMounted(() => {
  fetchCategories();
});
</script>
