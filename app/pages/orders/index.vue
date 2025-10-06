<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
  >
    <!-- Page Header -->
    <div class="mb-8 px-6 pt-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Orders Management
          </h1>
          <p class="text-gray-600 flex items-center">
            <Icon name="heroicons:cube" class="h-4 w-4 mr-2" />
            Manage your orders both online and offine.
          </p>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Filter Dropdown -->
          <select
            v-model="dateRange"
            @change="fetchOrders"
            class="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          >
            <option value="today">Today</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
            <option value="all_time">All Time</option>
          </select>
          <select
            v-model="selectedShop"
            class="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          >
            <option value="">All Shops</option>
            <option v-for="shop in shops" :key="shop.id" :value="shop.id">
              {{ shop.name }}
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
            @click="exportToExcel"
            class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Icon name="heroicons:arrow-down-tray" class="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>
    </div>

    <div class="px-6 pb-6">
      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <Icon name="heroicons:cube" class="h-6 w-6 text-blue-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Orders</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ filteredOrders.length }}
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
              <p class="text-sm font-medium text-gray-600">Paid Orders</p>
              <p class="text-2xl font-bold text-gray-900">{{ paidOrders }}</p>
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
              <p class="text-sm font-medium text-gray-600">Total Amount</p>
              <p class="text-2xl font-bold text-gray-900">
                $ {{ totalAmount.toFixed(2) }}
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
              <p class="text-sm font-medium text-gray-600">Paid Amount</p>
              <p class="text-2xl font-bold text-gray-900">
                $ {{ paidAmount.toFixed(2) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Orders Table -->
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Total Orders</h2>
          <p class="text-sm text-gray-600 mt-1">
            {{ filteredOrders.length }} orders found
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Invoice ID
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Service
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Grand Total ($)
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Payment
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
                v-for="order in filteredOrders"
                :key="order.id"
                class="hover:bg-gray-50"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900"
                >
                  {{ formatDate(order.created) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                  >
                    {{ order.invoice_id }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ order.expand?.item?.expand?.service?.name_kh || "-" }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ order.quantity }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  $ {{ order.grand_total.toFixed(2) || "0" }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="{
                      // Apply blue colors if the status is 'Paid'
                      'bg-green-100 text-green-800':
                        order.expand?.order_payments_via_order?.[0].status ===
                        'Paid',
                      // Apply red colors if the status is 'Due'
                      'bg-red-100 text-red-800':
                        order.expand?.order_payments_via_order?.[0].status ===
                        'Due',
                    }"
                  >
                    {{
                      order.expand?.order_payments_via_order?.[0].status || "-"
                    }}
                  </span>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <div class="flex items-center justify-end space-x-2">
                    <button
                      @click="openAddModal(order)"
                      class="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                    >
                      <Icon name="heroicons:eye" class="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Order Information Modal -->
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
                  :name="'heroicons:calendar-days'"
                  class="h-5 w-5 text-white"
                />
              </div>
              <h3 class="text-xl font-semibold text-white">
                Order Information
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
        <form class="p-6">
          <div class="space-y-5">
            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 border-b pb-5 border-gray-100"
            >
              <div>
                <p class="text-sm font-medium text-gray-500 mb-1">Invoice ID</p>
                <p class="text-lg font-bold text-indigo-700">
                  #{{ selectedOrder?.invoice_id }}
                </p>
              </div>

              <div>
                <p class="text-sm font-medium text-gray-500 mb-1">
                  Payment Status
                </p>
                <span
                  class="inline-flex px-3 py-1 text-sm font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800':
                      selectedOrder?.expand?.order_payments_via_order?.[0].status ===
                      'Paid',
                    'bg-red-100 text-red-800':
                      selectedOrder?.expand?.order_payments_via_order?.[0].status ===
                      'Due',
                    'bg-yellow-100 text-yellow-800':
                      selectedOrder?.expand?.order_payments_via_order?.[0].status ===
                      'Pending',
                  }"
                >
                  {{
                    selectedOrder?.expand?.order_payments_via_order?.[0].status || "N/A"
                  }}
                </span>
              </div>

              <div>
                <p class="text-sm font-medium text-gray-500 mb-1">
                  Grand Total
                </p>
                <p class="text-lg font-bold text-gray-900">
                  ${{ selectedOrder?.grand_total.toFixed(2) }}
                </p>
              </div>

              <div>
                <p class="text-sm font-medium text-gray-500 mb-1">Order Date</p>
                <p class="text-base text-gray-900">
                  {{ selectedOrder?.created ? new Date(selectedOrder.created).toLocaleDateString() : "-" }}
                </p>
              </div>
            </div>

            <div v-if="selectedOrder?.expand?.item">
              <h4
                class="text-lg font-semibold text-gray-800 mb-3 flex items-center"
              >
                <Icon
                  name="heroicons:shopping-bag"
                  class="h-5 w-5 mr-2 text-indigo-600"
                />
                Item Details
              </h4>
              <dl class="divide-y divide-gray-100">
                <div class="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium text-gray-500">
                    Service / Item
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {{
                      selectedOrder?.expand.item.expand?.service?.name ||
                      selectedOrder?.expand.item.type ||
                      "N/A"
                    }}
                  </dd>
                </div>

                <div
                  class="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                  v-if="selectedOrder?.expand.item.expand?.shop?.name"
                >
                  <dt class="text-sm font-medium text-gray-500">Shop</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {{ selectedOrder?.expand.item.expand.shop.name }}
                  </dd>
                </div>

                <div class="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium text-gray-500">Unit Price</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    ${{ selectedOrder?.expand.item.price.toFixed(2) }}
                  </dd>
                </div>

                <div class="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium text-gray-500">Quantity</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {{ selectedOrder?.quantity }}
                  </dd>
                </div>
              </dl>
            </div>
            <div v-else class="text-center py-4 text-gray-500 italic">
              No detailed item information available.
            </div>
          </div>
          <div
            class="flex justify-between items-center pt-6 mt-6 border-t border-gray-200"
          ></div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
// Set layout and middleware
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

// Set page meta
useHead({
  title: "Inventory - Inventory Management",
  meta: [
    {
      name: "description",
      content: "Manage inventory items, stock levels, and suppliers.",
    },
  ],
});

interface Order {
  id: string;
  invoice_id: string;
  quantity: number;
  grand_total: number;
  created: Date;
  expand?: {
    item?: {
      id: string;
      price: number;
      type: string;
      expand?: {
        service?: {
          id: string;
          name: string;
          name_kh: string;
        };
        shop?: {
          id: string;
          name: string;
        };
      };
    };
    order_payments_via_order?: [
      {
        status: string;
      }
    ];
  };
}

// Shop Interface
interface Shop {
  id: string;
  name: string;
}

// Reactive data
const dateRange = ref<"today" | "this_week" | "this_month" | "all_time">(
  "today"
);
const searchQuery = ref("");
const selectedShop = ref("");
const selectedOrder = ref<Order | null>(null);
const showModal = ref(false);
const loading = ref(false);

// Real inventory data from API
const orders = ref<Order[]>([]);
const shops = ref<Shop[]>([]);

const { user } = useAuthStore();

// Computed properties
const filteredOrders = computed(() => {
  let filtered = orders.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.invoice_id.toLowerCase().includes(query) ||
        item.expand?.order_payments_via_order?.[0].status
          .toLowerCase()
          .includes(query)
    );
  }

  if (selectedShop.value) {
    filtered = filtered.filter(
      (item) => item.expand?.item?.expand?.shop?.id === selectedShop.value
    );
  }

  return filtered;
});

const paidOrders = computed(
  () =>
    filteredOrders.value.filter(
      (item) => item.expand?.order_payments_via_order?.[0].status == "Paid"
    ).length
);

const totalAmount = computed(() =>
  filteredOrders.value.reduce((sum, order) => sum + (order.grand_total || 0), 0)
);

const paidAmount = computed(() =>
  filteredOrders.value
    .filter(
      (item) => item.expand?.order_payments_via_order?.[0].status == "Paid"
    )
    .reduce((sum, order) => sum + (order.grand_total || 0), 0)
);

// Fetch shops from API
const fetchShops = async () => {
  try {
    loading.value = true;
    const data = await $fetch<Shop[]>("/api/shops", {
      params: {
        user: user?.id || "",
      },
    });
    shops.value = data || [];
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    shops.value = [];
  } finally {
    loading.value = false;
  }
};

// API Methods
const fetchOrders = async () => {
  try {
    loading.value = true;
    const data = await $fetch<Order[]>("/api/orders", {
      params: {
        period: dateRange.value,
      },
    });
    orders.value = data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  } finally {
    loading.value = false;
  }
};

/**
 * Converts a UTC date string to 'Asia/Phnom_Penh' (UTC+7)
 * and formats it as 'dd-MM-yyyy hh:mm' (24-hour clock).
 * @param utcDateString The date string from order.created (e.g., "2025-10-05T07:16:42Z").
 * @returns The formatted date string.
 */
const formatDate = (utcDateString: string | Date | undefined): string => {
  // Handle undefined or null values
  if (!utcDateString) {
    return "-";
  }

  // Ensure we have a string if it's a Date object from the API response
  const date = new Date(utcDateString);

  // Define the desired format options
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    // 'h23' ensures the hour is in 24-hour format (00-23)
    hourCycle: "h23",
    timeZone: "Asia/Phnom_Penh", // Target timezone (UTC+7)
  };

  // Use a locale that uses the DD/MM/YYYY order (like 'en-GB' or 'en-US')
  const formatter = new Intl.DateTimeFormat("en-GB", options);
  const formattedParts = formatter.formatToParts(date);

  // Manually reconstruct the string to match the exact "dd-MM-yyyy HH:mm" structure.
  // This is necessary because Intl.DateTimeFormat output is locale-dependent (e.g., DD/MM/YYYY)
  const day = formattedParts.find((p) => p.type === "day")?.value || "00";
  const month = formattedParts.find((p) => p.type === "month")?.value || "00";
  const year = formattedParts.find((p) => p.type === "year")?.value || "0000";
  const hour = formattedParts.find((p) => p.type === "hour")?.value || "00";
  const minute = formattedParts.find((p) => p.type === "minute")?.value || "00";

  return `${day}/${month} ${hour}:${minute}`;
};

/**
 * Transforms the complex Order objects into a clean, flat array of objects
 * with human-readable keys, ready for SheetJS to process.
 * @param orders The array of Order objects.
 * @returns A flat array of objects suitable for SheetJS.
 */
const prepareExportData = (orders: Order[]) => {
  return orders.map((order) => {
    // Determine the payment status text
    const paymentStatus =
      order.expand?.order_payments_via_order?.[0].status || "N/A";
    const grandTotal = order.grand_total ? order.grand_total.toFixed(2) : '0.00';
    
    // Return a clean object where keys are the desired column headers
    return {
      "Date & Time": formatDate(order.created),
      "Invoice ID": order.invoice_id,
      "Service Name (Khmer)": order.expand?.item?.expand?.service?.name_kh || "-",
      "Quantity": order.quantity,
      "Grand Total ($)": parseFloat(grandTotal), // Keep as number for SheetJS
      "Payment Status": paymentStatus,
      "Shop Name": order.expand?.item?.expand?.shop?.name || "N/A",
    };
  });
};

/**
 * Triggers the download of the filtered orders as a true Excel (.xlsx) file
 * using the SheetJS (xlsx) library.
 */
const exportToExcel = () => {
  if (filteredOrders.value.length === 0) {
    alert("No orders to export.");
    return;
  }

  // 1. Prepare the data
  const dataToExport = prepareExportData(filteredOrders.value);
  
  // 2. Create a new worksheet from the JSON data
  // SheetJS automatically handles headers from the object keys, quoting, and encoding.
  const ws = XLSX.utils.json_to_sheet(dataToExport);

  // Optional: Set column widths for a better viewing experience
  const wscols = [
    { wch: 18 }, // Date & Time
    { wch: 15 }, // Invoice ID
    { wch: 30 }, // Service Name (Khmer)
    { wch: 10 }, // Quantity
    { wch: 18 }, // Grand Total ($)
    { wch: 15 }, // Payment Status
    { wch: 20 }, // Shop Name
  ];
  ws['!cols'] = wscols;

  // 3. Create a new workbook and add the worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Orders Data");

  // 4. Write the workbook to a binary array buffer
  const wbout = XLSX.write(wb, {
    bookType: 'xlsx', // Specify the format as XLSX
    type: 'array'
  });

  // 5. Create a Blob and trigger the download using file-saver
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  const date = new Date().toISOString().slice(0, 10);
  const fileName = `orders_export_${date}.xlsx`;

  saveAs(blob, fileName);
};

const openAddModal = (order: Order) => {
  selectedOrder.value = order; 
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

// Initialize data on mount
onMounted(() => {
  fetchOrders();
  fetchShops();
});
</script>
