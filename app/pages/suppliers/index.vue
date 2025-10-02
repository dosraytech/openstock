<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
  >
    <!-- Page Header -->
    <div class="mb-8 px-6 pt-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Suppliers Management
          </h1>
          <p class="text-gray-600 flex items-center">
            <Icon name="heroicons:building-office" class="h-4 w-4 mr-2" />
            Manage your supplier relationships and contact information
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
              placeholder="Search suppliers..."
              class="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
          <!-- Add Supplier Button -->
          <button
            @click="openAddModal"
            class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Icon name="heroicons:plus" class="h-4 w-4 mr-2" />
            Add Supplier
          </button>
        </div>
      </div>
    </div>

    <div class="px-6">
      <!-- Suppliers Table -->
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">All Suppliers</h2>
          <p class="text-sm text-gray-600 mt-1">
            {{ filteredSuppliers.length }} total suppliers
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Supplier
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contact
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Order
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
                v-for="supplier in filteredSuppliers"
                :key="supplier.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div
                      class="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center"
                    >
                      <Icon
                        name="heroicons:building-office"
                        class="h-5 w-5 text-indigo-600"
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ supplier.name }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ supplier.code }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ supplier.contactPerson }}
                  </div>
                  <div class="text-sm text-gray-500">{{ supplier.email }}</div>
                  <div class="text-sm text-gray-500">{{ supplier.phone }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                  >
                    {{ supplier.category }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      supplier.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : supplier.status === 'inactive'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800',
                    ]"
                  >
                    {{ supplier.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ supplier.lastOrderDate || 'Never' }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <div class="flex items-center justify-end space-x-2">
                    <button
                      @click="editSupplier(supplier)"
                      class="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                    >
                      <Icon name="heroicons:pencil" class="h-4 w-4" />
                    </button>
                    <button
                      @click="deleteSupplier(supplier.id)"
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

    <!-- Add/Edit Supplier Modal -->
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
                    editingSupplier
                      ? 'heroicons:pencil-square'
                      : 'heroicons:plus'
                  "
                  class="h-5 w-5 text-white"
                />
              </div>
              <h3 class="text-xl font-semibold text-white">
                {{ editingSupplier ? 'Edit Supplier' : 'Add New Supplier' }}
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
        <form @submit.prevent="saveSupplier" class="p-6">
          <div class="space-y-5">
            <!-- Basic Info Row -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <Icon
                    name="heroicons:building-office"
                    class="inline h-4 w-4 mr-1"
                  />
                  Supplier Name
                </label>
                <input
                  v-model="supplierForm.name"
                  type="text"
                  required
                  placeholder="e.g., Tech Solutions Inc."
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <Icon name="heroicons:hashtag" class="inline h-4 w-4 mr-1" />
                  Supplier Code
                </label>
                <input
                  v-model="supplierForm.code"
                  type="text"
                  required
                  placeholder="e.g., TECH001"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <!-- Contact Info Row -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <Icon name="heroicons:user" class="inline h-4 w-4 mr-1" />
                  Contact Person
                </label>
                <input
                  v-model="supplierForm.contactPerson"
                  type="text"
                  required
                  placeholder="e.g., John Smith"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <Icon name="heroicons:phone" class="inline h-4 w-4 mr-1" />
                  Phone
                  <span class="text-xs text-gray-500">(optional)</span>
                </label>
                <input
                  v-model="supplierForm.phone"
                  type="tel"
                  placeholder="e.g., +1 (555) 123-4567"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <Icon name="heroicons:envelope" class="inline h-4 w-4 mr-1" />
                Email Address
              </label>
              <input
                v-model="supplierForm.email"
                type="email"
                required
                placeholder="e.g., contact@techsolutions.com"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>

            <!-- Category & Status Row -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <Icon name="heroicons:tag" class="inline h-4 w-4 mr-1" />
                  Category
                </label>
                <select
                  v-model="supplierForm.category"
                  required
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Raw Materials">Raw Materials</option>
                  <option value="Services">Services</option>
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
                <select
                  v-model="supplierForm.status"
                  required
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
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
                  :name="editingSupplier ? 'heroicons:check' : 'heroicons:plus'"
                  class="h-4 w-4 mr-2"
                />
                {{
                  loading
                    ? 'Saving...'
                    : editingSupplier
                    ? 'Update Supplier'
                    : 'Add Supplier'
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
  title: 'Suppliers - Inventory Management',
  meta: [
    {
      name: 'description',
      content: 'Manage suppliers and vendor relationships for your inventory.',
    },
  ],
});

// Supplier interface
interface Supplier {
  id: string;
  name: string;
  code: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: string;
  status: 'active' | 'inactive' | 'pending';
  lastOrderDate?: string;
  created: string;
  updated: string;
}

// Reactive data
const searchQuery = ref('');
const showModal = ref(false);
const editingSupplier = ref<Supplier | null>(null);
const loading = ref(false);

// Real suppliers data from API
const suppliers = ref<Supplier[]>([]);

// Supplier form
const supplierForm = ref({
  name: '',
  code: '',
  contactPerson: '',
  email: '',
  phone: '',
  category: '',
  status: 'active' as 'active' | 'inactive' | 'pending',
});

// Computed
const filteredSuppliers = computed(() => {
  if (!searchQuery.value) return suppliers.value;

  const query = searchQuery.value.toLowerCase();
  return suppliers.value.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(query) ||
      supplier.code.toLowerCase().includes(query) ||
      supplier.contactPerson.toLowerCase().includes(query) ||
      supplier.email.toLowerCase().includes(query)
  );
});

// API Methods
const fetchSuppliers = async () => {
  try {
    loading.value = true;
    const data = await $fetch<Supplier[]>('/api/suppliers');
    suppliers.value = data;
  } catch (error) {
    console.error('Failed to fetch suppliers:', error);
  } finally {
    loading.value = false;
  }
};

const openAddModal = () => {
  editingSupplier.value = null;
  supplierForm.value = {
    name: '',
    code: '',
    contactPerson: '',
    email: '',
    phone: '',
    category: '',
    status: 'active',
  };
  showModal.value = true;
};

const editSupplier = (supplier: Supplier) => {
  editingSupplier.value = supplier;
  supplierForm.value = {
    name: supplier.name,
    code: supplier.code,
    contactPerson: supplier.contactPerson,
    email: supplier.email,
    phone: supplier.phone,
    category: supplier.category,
    status: supplier.status,
  };
  showModal.value = true;
};

const saveSupplier = async () => {
  try {
    loading.value = true;

    if (editingSupplier.value) {
      // Update existing supplier
      const updatedSupplier = await $fetch<Supplier>(
        `/api/suppliers/${editingSupplier.value.id}`,
        {
          method: 'PUT',
          body: supplierForm.value,
        }
      );

      // Update local state
      const index = suppliers.value.findIndex(
        (s) => s.id === editingSupplier.value!.id
      );
      if (index > -1) {
        suppliers.value[index] = updatedSupplier;
      }
    } else {
      // Add new supplier
      const newSupplier = await $fetch<Supplier>('/api/suppliers', {
        method: 'POST',
        body: supplierForm.value,
      });

      suppliers.value.unshift(newSupplier);
    }

    closeModal();
  } catch (error) {
    console.error('Failed to save supplier:', error);
  } finally {
    loading.value = false;
  }
};

const deleteSupplier = async (id: string) => {
  if (confirm('Are you sure you want to delete this supplier?')) {
    try {
      await $fetch(`/api/suppliers/${id}`, {
        method: 'DELETE',
      });

      // Remove from local state
      const index = suppliers.value.findIndex((s) => s.id === id);
      if (index > -1) {
        suppliers.value.splice(index, 1);
      }
    } catch (error) {
      console.error('Failed to delete supplier:', error);
    }
  }
};

const closeModal = () => {
  showModal.value = false;
  editingSupplier.value = null;
};

// Initialize data on mount
onMounted(() => {
  fetchSuppliers();
});
</script>
