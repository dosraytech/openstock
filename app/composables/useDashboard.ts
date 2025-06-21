export const useDashboard = () => {
  const stats = ref({
    totalProducts: 1247,
    lowStockItems: 23,
    totalValue: 325600,
    pendingOrders: 8,
  });

  const recentActivity = ref([
    {
      id: 1,
      description: 'New product "Laptop Dell XPS 13" added to inventory',
      time: '2 minutes ago',
      icon: 'heroicons:cube',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      id: 2,
      description: 'Purchase order #PO-2024-001 received from TechSupplier',
      time: '15 minutes ago',
      icon: 'heroicons:truck',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      id: 3,
      description: 'Stock alert: "iPhone 15 Pro" below minimum threshold',
      time: '1 hour ago',
      icon: 'heroicons:exclamation-triangle',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      id: 4,
      description: 'Price updated for "Samsung Galaxy S24" - €899.99',
      time: '2 hours ago',
      icon: 'heroicons:currency-euro',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ]);

  const upcomingTasks = ref([
    {
      id: 1,
      title: 'Reorder iPhone 15 Pro stock',
      dueDate: 'Today, 2:00 PM',
      priority: 'High',
      priorityClass: 'bg-red-100 text-red-800',
    },
    {
      id: 2,
      title: 'Review supplier contract - ElectroWholesale',
      dueDate: 'Tomorrow, 10:00 AM',
      priority: 'Medium',
      priorityClass: 'bg-yellow-100 text-yellow-800',
    },
    {
      id: 3,
      title: 'Update pricing for laptop category',
      dueDate: 'Friday, 3:00 PM',
      priority: 'Low',
      priorityClass: 'bg-gray-100 text-gray-800',
    },
  ]);

  const inventoryCategories = ref([
    { name: 'Electronics', count: 234, value: 145000, color: 'bg-blue-400' },
    { name: 'Accessories', count: 567, value: 78000, color: 'bg-green-400' },
    { name: 'Components', count: 189, value: 56000, color: 'bg-yellow-400' },
    { name: 'Furniture', count: 98, value: 34000, color: 'bg-purple-400' },
    { name: 'Software', count: 159, value: 12600, color: 'bg-indigo-400' },
  ]);

  return {
    stats,
    recentActivity,
    upcomingTasks,
    inventoryCategories,
  };
};
