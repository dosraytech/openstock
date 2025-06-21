<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Your Profile</h1>
      <p class="text-gray-600">
        Manage your account information and preferences
      </p>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <div class="text-center">
        <Icon
          name="heroicons:user-circle"
          class="h-16 w-16 text-gray-400 mx-auto mb-4"
        />
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Profile Coming Soon
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
