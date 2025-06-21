<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <LayoutDashboardSidebar :is-open="sidebarOpen" @close="closeSidebar" />

    <!-- Main content -->
    <div class="flex-1 lg:ml-0">
      <!-- Header -->
      <LayoutDashboardHeader
        :title="pageTitle"
        @toggle-sidebar="toggleSidebar"
      />

      <!-- Page content -->
      <main class="p-4 sm:p-6 lg:p-8 overflow-auto">
        <slot />
      </main>
    </div>

    <!-- Mobile sidebar overlay -->
    <div
      v-if="sidebarOpen"
      @click="closeSidebar"
      class="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
    ></div>
  </div>
</template>

<script setup lang="ts">
const { sidebarOpen, pageTitle, toggleSidebar, closeSidebar } =
  useDashboardLayout();
</script>
