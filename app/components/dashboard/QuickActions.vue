<template>
  <div
    class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
  >
    <div class="p-6 border-b border-gray-100">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">Quick Actions</h3>
          <p class="text-sm text-gray-500">Streamline your workflow</p>
        </div>
        <div class="p-2 bg-indigo-50 rounded-lg">
          <Icon name="heroicons:bolt" class="h-5 w-5 text-indigo-600" />
        </div>
      </div>
    </div>
    <div class="p-6">
      <div class="space-y-3">
        <button
          class="group w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200 rounded-xl transition-all duration-200 hover:shadow-md"
        >
          <div class="flex items-center">
            <div
              class="p-2 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform duration-200"
            >
              <Icon name="heroicons:plus" class="h-5 w-5 text-white" />
            </div>
            <div class="ml-4 text-left">
              <p class="text-sm font-semibold text-gray-900">Add Product</p>
              <p class="text-xs text-gray-500">Create new inventory item</p>
            </div>
          </div>
          <Icon
            name="heroicons:chevron-right"
            class="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors"
          />
        </button>

        <button
          class="group w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border border-green-200 rounded-xl transition-all duration-200 hover:shadow-md"
        >
          <div class="flex items-center">
            <div
              class="p-2 bg-green-500 rounded-lg group-hover:scale-110 transition-transform duration-200"
            >
              <Icon name="heroicons:shopping-cart" class="h-5 w-5 text-white" />
            </div>
            <div class="ml-4 text-left">
              <p class="text-sm font-semibold text-gray-900">Purchase Order</p>
              <p class="text-xs text-gray-500">Order from suppliers</p>
            </div>
          </div>
          <Icon
            name="heroicons:chevron-right"
            class="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors"
          />
        </button>

        <button
          class="group w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border border-purple-200 rounded-xl transition-all duration-200 hover:shadow-md"
        >
          <div class="flex items-center">
            <div
              class="p-2 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform duration-200"
            >
              <Icon
                name="heroicons:building-office"
                class="h-5 w-5 text-white"
              />
            </div>
            <div class="ml-4 text-left">
              <p class="text-sm font-semibold text-gray-900">
                Manage Suppliers
              </p>
              <p class="text-xs text-gray-500">View and edit suppliers</p>
            </div>
          </div>
          <Icon
            name="heroicons:chevron-right"
            class="h-4 w-4 text-gray-400 group-hover:text-purple-600 transition-colors"
          />
        </button>

        <button
          class="group w-full flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 border border-orange-200 rounded-xl transition-all duration-200 hover:shadow-md"
        >
          <div class="flex items-center">
            <div
              class="p-2 bg-orange-500 rounded-lg group-hover:scale-110 transition-transform duration-200"
            >
              <Icon name="heroicons:currency-euro" class="h-5 w-5 text-white" />
            </div>
            <div class="ml-4 text-left">
              <p class="text-sm font-semibold text-gray-900">Update Pricing</p>
              <p class="text-xs text-gray-500">Adjust product prices</p>
            </div>
          </div>
          <Icon
            name="heroicons:chevron-right"
            class="h-4 w-4 text-gray-400 group-hover:text-orange-600 transition-colors"
          />
        </button>
      </div>

      <!-- Quick Stats -->
      <div class="mt-6 pt-4 border-t border-gray-100">
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-500">Actions completed today</span>
          <span class="font-semibold text-gray-900">23</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Future enhancement: Add emit events for button clicks
// Actions: addProduct, createPurchaseOrder, manageSuppliers, updatePricing
</script>
