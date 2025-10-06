<template>
  <div
    class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
  >
    <!-- Enhanced Header -->
    <div class="p-6 border-b border-gray-100">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">
            Orders Chart
          </h3>
          <p class="text-sm text-gray-500">
            Daily Orders Overview
          </p>
        </div>
        <div class="flex items-center space-x-3">
          <!-- Time Period Selector -->
          <div class="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              @click="selectedPeriod = '30D'"
              :class="
                selectedPeriod === '30D'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              "
              class="px-3 py-1 text-xs font-medium rounded-md transition-colors"
            >
              30D
            </button>
            <button
              @click="selectedPeriod = '7D'"
              :class="
                selectedPeriod === '7D'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              "
              class="px-3 py-1 text-xs font-medium rounded-md transition-colors"
            >
              7D
            </button>
            <button
              @click="selectedPeriod = '1Y'"
              :class="
                selectedPeriod === '1Y'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              "
              class="px-3 py-1 text-xs font-medium rounded-md transition-colors"
            >
              1Y
            </button>
          </div>
          <!-- Chart Type Selector -->
          <div class="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              @click="chartType = 'bar'"
              :class="
                chartType === 'bar'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              "
              class="p-1 rounded-md transition-colors"
            >
              <Icon name="heroicons:chart-bar" class="h-4 w-4" />
            </button>
            <button
              @click="chartType = 'line'"
              :class="
                chartType === 'line'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              "
              class="p-1 rounded-md transition-colors"
            >
              <Icon name="heroicons:chart-bar-square" class="h-4 w-4" />
            </button>
          </div>
          <!-- Export Button -->
          <button
            class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Icon name="heroicons:arrow-down-tray" class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Chart Area -->
    <div class="p-6">
      <div class="h-72">
        <ClientOnly>
          <apexchart
            :options="chartOptions"
            :series="chartSeries"
            :type="chartType"
            height="100%"
            width="100%"
          />
          <template #fallback>
            <div
              class="h-full flex items-center justify-center bg-gray-50 rounded-lg"
            >
              <div class="text-center">
                <Icon
                  name="heroicons:chart-bar"
                  class="h-12 w-12 text-gray-400 mx-auto mb-2"
                />
                <p class="text-sm text-gray-500">Loading chart...</p>
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>

      <!-- Chart Legend and Stats -->
      <div
        class="mt-6 flex items-center justify-between pt-4 border-t border-gray-100"
      >
        <div class="flex items-center space-x-6">
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span class="text-sm text-gray-600">Orders</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span class="text-sm text-gray-600">Paid</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
            <span class="text-sm text-gray-600">Due</span>
          </div>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-500">Avg. Monthly Growth</p>
          <p class="text-lg font-bold text-green-600">+12.5%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const selectedPeriod = ref('1Y');
const chartType = ref('bar');

// Chart data based on selected period
const chartData = computed(() => {
  const data: Record<
    string,
    {
      categories: string[];
      inStock: number[];
      lowStock: number[];
      outOfStock: number[];
    }
  > = {
    '7D': {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      inStock: [820, 850, 890, 920, 880, 950, 970],
      lowStock: [45, 42, 38, 35, 41, 33, 28],
      outOfStock: [12, 8, 15, 10, 18, 7, 5],
    },
    '30D': {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      inStock: [850, 920, 890, 980],
      lowStock: [68, 45, 52, 33],
      outOfStock: [25, 18, 22, 12],
    },
    '1Y': {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      inStock: [750, 820, 880, 920, 850, 950, 980, 1020, 950, 890, 920, 980],
      lowStock: [85, 68, 52, 45, 62, 38, 33, 28, 45, 52, 38, 30],
      outOfStock: [35, 25, 22, 18, 28, 15, 12, 8, 18, 22, 15, 10],
    },
  };
  return data[selectedPeriod.value] || data['30D'];
});

// Chart series
const chartSeries = computed(() => [
  {
    name: 'In Stock',
    data: chartData.value?.inStock || [],
    color: '#3b82f6',
  },
  {
    name: 'Low Stock',
    data: chartData.value?.lowStock || [],
    color: '#eab308',
  },
  {
    name: 'Out of Stock',
    data: chartData.value?.outOfStock || [],
    color: '#ef4444',
  },
]);

// Chart configuration
const chartOptions = computed(() => ({
  chart: {
    type: chartType.value,
    height: '100%',
    background: 'transparent',
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '60%',
      borderRadius: 4,
      dataLabels: {
        position: 'top',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: chartType.value === 'line' ? 3 : 0,
    curve: 'smooth',
  },
  grid: {
    borderColor: '#f1f5f9',
    strokeDashArray: 3,
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  xaxis: {
    categories: chartData.value?.categories || [],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: '#64748b',
        fontSize: '12px',
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: '#64748b',
        fontSize: '12px',
      },
    },
  },
  legend: {
    show: false,
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
  fill: {
    opacity: chartType.value === 'line' ? 0.1 : 0.9,
    type: chartType.value === 'line' ? 'gradient' : 'solid',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.3,
      gradientToColors: undefined,
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0.1,
      stops: [0, 100],
    },
  },
  markers: {
    size: chartType.value === 'line' ? 6 : 0,
    strokeWidth: 2,
    strokeColors: '#ffffff',
    hover: {
      size: 8,
    },
  },
}));
</script>
