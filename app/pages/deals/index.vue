<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Deals</h1>
      <p class="text-gray-600">Track your sales pipeline and opportunities</p>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <div class="text-center">
        <Icon
          name="heroicons:currency-dollar"
          class="h-16 w-16 text-gray-400 mx-auto mb-4"
        />
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Deals Coming Soon
        </h3>
        <p class="text-gray-500">
          This feature is currently under development.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
});
</script>
