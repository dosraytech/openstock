<template>
  <div
    class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
  >
    <div class="p-6 border-b border-gray-100">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">
            Category Distribution
          </h3>
          <p class="text-sm text-gray-500">Inventory breakdown by category</p>
        </div>
        <div class="p-2 bg-purple-50 rounded-lg">
          <Icon name="heroicons:chart-pie" class="h-5 w-5 text-purple-600" />
        </div>
      </div>
    </div>
    <div class="p-6">
      <div class="h-64">
        <ClientOnly>
          <apexchart
            :options="chartOptions"
            :series="chartSeries"
            type="donut"
            height="100%"
            width="100%"
          />
          <template #fallback>
            <div
              class="h-full flex items-center justify-center bg-gray-50 rounded-lg"
            >
              <div class="text-center">
                <Icon
                  name="heroicons:chart-pie"
                  class="h-12 w-12 text-gray-400 mx-auto mb-2"
                />
                <p class="text-sm text-gray-500">Loading chart...</p>
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>

      <!-- Legend -->
      <div class="mt-6 grid grid-cols-2 gap-4">
        <div
          v-for="(category, index) in categories"
          :key="category"
          class="flex items-center space-x-2"
        >
          <div
            class="w-3 h-3 rounded-full"
            :style="`background-color: ${colors[index]}`"
          ></div>
          <span class="text-sm text-gray-600">{{ category }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
const categories = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Toys',
];
const chartSeries = [125, 89, 67, 45, 32, 28];
const colors = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#06b6d4',
];

const chartOptions = {
  chart: {
    type: 'donut',
    background: 'transparent',
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
    },
  },
  colors: colors,
  labels: categories,
  legend: {
    show: false,
  },
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          total: {
            show: true,
            showAlways: true,
            label: 'Total Items',
            fontSize: '14px',
            fontWeight: 600,
            color: '#374151',
            formatter: () => {
              return chartSeries.reduce((a, b) => a + b, 0).toString();
            },
          },
          value: {
            show: true,
            fontSize: '24px',
            fontWeight: 700,
            color: '#111827',
          },
        },
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    theme: 'light',
    style: {
      fontSize: '12px',
    },
    y: {
      formatter: (val: number) => `${val} items`,
    },
  },
  stroke: {
    width: 2,
    colors: ['#ffffff'],
  },
};
</script>
