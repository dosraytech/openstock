<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
  >
    <!-- Page Header -->
    <div class="mb-8 px-6 pt-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Inventory Management
          </h1>
          <p class="text-gray-600 flex items-center">
            <Icon name="heroicons:cube" class="h-4 w-4 mr-2" />
            Track and manage your inventory items and stock levels
          </p>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Filter Dropdown -->
          <select
            v-model="selectedCategory"
            class="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          >
            <option value="">All Categories</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <!-- Search -->
          <div class="relative">
            <Icon
              name="heroicons:magnifying-glass"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search inventory..."
              class="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
          <!-- Add Item Button -->
          <button
            @click="openAddModal"
            class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Icon name="heroicons:plus" class="h-4 w-4 mr-2" />
            Add Item
          </button>
        </div>
      </div>
    </div>

    <div class="px-6">
      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <Icon name="heroicons:cube" class="h-6 w-6 text-blue-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Items</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ filteredInventory.length }}
              </p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-lg">
              <Icon
                name="heroicons:arrow-trending-up"
                class="h-6 w-6 text-green-600"
              />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">In Stock</p>
              <p class="text-2xl font-bold text-gray-900">{{ inStockCount }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 rounded-lg">
              <Icon
                name="heroicons:exclamation-triangle"
                class="h-6 w-6 text-yellow-600"
              />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Low Stock</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ lowStockCount }}
              </p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="p-3 bg-red-100 rounded-lg">
              <Icon name="heroicons:x-circle" class="h-6 w-6 text-red-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Out of Stock</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ outOfStockCount }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Inventory Table -->
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Inventory Items</h2>
          <p class="text-sm text-gray-600 mt-1">
            {{ filteredInventory.length }} items found
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Item
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  SKU
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stock
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Supplier
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="item in filteredInventory"
                :key="item.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div
                      class="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center"
                    >
                      <Icon
                        name="heroicons:cube"
                        class="h-5 w-5 text-gray-500"
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ item.name }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ item.description }}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900"
                >
                  {{ item.sku }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                  >
                    {{ item.expand?.category?.name || 'No Category' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ item.currentStock }}/{{ item.minStock }}
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                      :class="[
                        'h-2 rounded-full',
                        getStockColor(item.currentStock, item.minStock),
                      ]"
                      :style="{
                        width: `${Math.min(
                          (item.currentStock / item.minStock) * 100,
                          100
                        )}%`,
                      }"
                    ></div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${{ item.unitPrice.toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.expand?.supplier?.name || 'No Supplier' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      getStatusColor(item.currentStock, item.minStock),
                    ]"
                  >
                    {{ getStockStatus(item.currentStock, item.minStock) }}
                  </span>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <div class="flex items-center justify-end space-x-2">
                    <button
                      @click="editItem(item)"
                      class="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                    >
                      <Icon name="heroicons:pencil" class="h-4 w-4" />
                    </button>
                    <button
                      @click="deleteItem(item.id)"
                      class="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                    >
                      <Icon name="heroicons:trash" class="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Add/Edit Item Modal -->
    <div
      v-if="showModal"
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
                    editingItem ? 'heroicons:pencil-square' : 'heroicons:plus'
                  "
                  class="h-5 w-5 text-white"
                />
              </div>
              <h3 class="text-xl font-semibold text-white">
                {{ editingItem ? 'Edit Inventory Item' : 'Add New Item' }}
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
        <form @submit.prevent="saveItem" class="p-6">
          <div class="space-y-5">
            <!-- Basic Info Row -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <Icon name="heroicons:cube" class="inline h-4 w-4 mr-1" />
                  Item Name
                </label>
                <input
                  v-model="itemForm.name"
                  type="text"
                  required
                  placeholder="e.g., iPhone 14 Pro"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <Icon name="heroicons:hashtag" class="inline h-4 w-4 mr-1" />
                  SKU
                </label>
                <input
                  v-model="itemForm.sku"
                  type="text"
                  required
                  placeholder="e.g., IP14P-128-BLK"
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
              </label>
              <textarea
                v-model="itemForm.description"
                rows="2"
                placeholder="Brief description of the item..."
                class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
              ></textarea>
            </div>

            <!-- Category & Supplier Row -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <Icon name="heroicons:tag" class="inline h-4 w-4 mr-1" />
                  Category
                  <span class="text-xs text-gray-500">(optional)</span>
                </label>
                <select
                  v-model="itemForm.category"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
                >
                  <option value="">No category</option>
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <Icon
                    name="heroicons:building-office"
                    class="inline h-4 w-4 mr-1"
                  />
                  Supplier
                  <span class="text-xs text-gray-500">(optional)</span>
                </label>
                <select
                  v-model="itemForm.supplier"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
                >
                  <option value="">No supplier</option>
                  <option
                    v-for="supplier in suppliers"
                    :key="supplier.id"
                    :value="supplier.id"
                  >
                    {{ supplier.name }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Stock & Price Row -->
            <div class="grid grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <Icon
                    name="heroicons:archive-box"
                    class="inline h-4 w-4 mr-1"
                  />
                  Current Stock
                </label>
                <input
                  v-model.number="itemForm.currentStock"
                  type="number"
                  min="0"
                  required
                  placeholder="0"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <Icon
                    name="heroicons:exclamation-triangle"
                    class="inline h-4 w-4 mr-1"
                  />
                  Min Stock
                </label>
                <input
                  v-model.number="itemForm.minStock"
                  type="number"
                  min="0"
                  required
                  placeholder="0"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <Icon
                    name="heroicons:currency-dollar"
                    class="inline h-4 w-4 mr-1"
                  />
                  Unit Price
                </label>
                <input
                  v-model.number="itemForm.unitPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  placeholder="0.00"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
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
              All fields marked as required must be filled
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
                  :name="editingItem ? 'heroicons:check' : 'heroicons:plus'"
                  class="h-4 w-4 mr-2"
                />
                {{
                  loading
                    ? 'Saving...'
                    : editingItem
                    ? 'Update Item'
                    : 'Add Item'
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
  title: 'Inventory - Inventory Management',
  meta: [
    {
      name: 'description',
      content: 'Manage inventory items, stock levels, and suppliers.',
    },
  ],
});

// Inventory item interface
interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  description: string;
  category: string; // relation ID
  currentStock: number;
  minStock: number;
  unitPrice: number;
  supplier: string; // relation ID
  created: string;
  updated: string;
  expand?: {
    category?: { id: string; name: string };
    supplier?: { id: string; name: string };
  };
}

interface Category {
  id: string;
  name: string;
  code: string;
  description?: string;
  color?: string;
  isActive: boolean;
}

interface Supplier {
  id: string;
  name: string;
  code: string;
  contactPerson: string;
  email: string;
  phone?: string;
  category?: string;
  status: 'active' | 'inactive' | 'pending';
}

// Reactive data
const searchQuery = ref('');
const selectedCategory = ref('');
const showModal = ref(false);
const editingItem = ref<InventoryItem | null>(null);
const loading = ref(false);

// Real inventory data from API
const inventory = ref<InventoryItem[]>([]);
const categories = ref<Category[]>([]);
const suppliers = ref<Supplier[]>([]);

// Item form
const itemForm = ref({
  name: '',
  sku: '',
  description: '',
  category: '',
  currentStock: 0,
  minStock: 0,
  unitPrice: 0,
  supplier: '',
});

// Computed properties
const filteredInventory = computed(() => {
  let filtered = inventory.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.expand?.supplier?.name || '').toLowerCase().includes(query)
    );
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(
      (item) => item.category === selectedCategory.value
    );
  }

  return filtered;
});

const inStockCount = computed(
  () =>
    inventory.value.filter((item) => item.currentStock > item.minStock).length
);

const lowStockCount = computed(
  () =>
    inventory.value.filter(
      (item) => item.currentStock > 0 && item.currentStock <= item.minStock
    ).length
);

const outOfStockCount = computed(
  () => inventory.value.filter((item) => item.currentStock === 0).length
);

// API Methods
const fetchInventory = async () => {
  try {
    loading.value = true;
    const data = await $fetch<InventoryItem[]>('/api/inventory');
    inventory.value = data;
  } catch (error) {
    console.error('Failed to fetch inventory:', error);
  } finally {
    loading.value = false;
  }
};

const fetchCategories = async () => {
  try {
    const data = await $fetch<Category[]>('/api/categories');
    categories.value = data.filter((cat) => cat.isActive !== false);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
};

const fetchSuppliers = async () => {
  try {
    const data = await $fetch<Supplier[]>('/api/suppliers');
    suppliers.value = data.filter((supplier) => supplier.status === 'active');
  } catch (error) {
    console.error('Failed to fetch suppliers:', error);
  }
};

// Methods
const getStockStatus = (current: number, min: number) => {
  if (current === 0) return 'Out of Stock';
  if (current <= min) return 'Low Stock';
  return 'In Stock';
};

const getStatusColor = (current: number, min: number) => {
  if (current === 0) return 'bg-red-100 text-red-800';
  if (current <= min) return 'bg-yellow-100 text-yellow-800';
  return 'bg-green-100 text-green-800';
};

const getStockColor = (current: number, min: number) => {
  if (current === 0) return 'bg-red-500';
  if (current <= min) return 'bg-yellow-500';
  return 'bg-green-500';
};

const openAddModal = () => {
  editingItem.value = null;
  itemForm.value = {
    name: '',
    sku: '',
    description: '',
    category: '',
    currentStock: 0,
    minStock: 0,
    unitPrice: 0,
    supplier: '',
  };
  showModal.value = true;
};

const editItem = (item: InventoryItem) => {
  editingItem.value = item;
  itemForm.value = {
    name: item.name,
    sku: item.sku,
    description: item.description,
    category: item.category || '',
    currentStock: item.currentStock,
    minStock: item.minStock,
    unitPrice: item.unitPrice,
    supplier: item.supplier || '',
  };
  showModal.value = true;
};

const saveItem = async () => {
  try {
    loading.value = true;

    const itemData = {
      name: itemForm.value.name,
      sku: itemForm.value.sku,
      description: itemForm.value.description,
      category: itemForm.value.category || null,
      currentStock: itemForm.value.currentStock,
      minStock: itemForm.value.minStock,
      unitPrice: itemForm.value.unitPrice,
      supplier: itemForm.value.supplier || null,
    };

    if (editingItem.value) {
      // Update existing item
      await fetch(`/api/inventory/${editingItem.value.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      });
    } else {
      // Add new item
      await $fetch('/api/inventory', {
        method: 'POST',
        body: itemData,
      });
    }

    // Refresh inventory list
    await fetchInventory();
    closeModal();
  } catch (error) {
    console.error('Failed to save item:', error);
    alert('Failed to save item. Please try again.');
  } finally {
    loading.value = false;
  }
};

const deleteItem = async (id: string) => {
  if (confirm('Are you sure you want to delete this item?')) {
    try {
      loading.value = true;
      await fetch(`/api/inventory/${id}`, {
        method: 'DELETE',
      });

      // Refresh inventory list
      await fetchInventory();
    } catch (error) {
      console.error('Failed to delete item:', error);
      alert('Failed to delete item. Please try again.');
    } finally {
      loading.value = false;
    }
  }
};

const closeModal = () => {
  showModal.value = false;
  editingItem.value = null;
};

// Initialize data on mount
onMounted(() => {
  fetchInventory();
  fetchCategories();
  fetchSuppliers();
});
</script>
