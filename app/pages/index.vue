<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Navigation -->
    <nav
      class="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex items-center space-x-3">
              <div
                class="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg"
              >
                <Icon name="heroicons:cube" class="h-6 w-6 text-white" />
              </div>
              <div>
                <span
                  class="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                  >OpenStock</span
                >
                <div class="text-xs text-gray-400 -mt-1">Inventory System</div>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <a
              href="https://github.com/florianjs/openstock"
              class="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
            >
              <Icon name="simple-icons:github" class="h-5 w-5" />
            </a>
            <NuxtLink
              to="/login"
              class="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-800"
            >
              Sign In
            </NuxtLink>
            <NuxtLink
              to="/demo/dashboard"
              class="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Demo
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <main class="relative overflow-hidden">
      <!-- Background Effects -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800"
      ></div>
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.1),transparent_50%)]"
      ></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center">
          <!-- Badge -->
          <div
            class="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 text-sm text-gray-300 mb-8"
          >
            <Icon name="heroicons:star" class="h-4 w-4 text-yellow-500 mr-2" />
            Open Source • Self-Hosted • Always Free
          </div>

          <!-- Main Heading -->
          <h1 class="text-5xl sm:text-7xl font-bold mb-6">
            <span
              class="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
            >
              Open Source
            </span>
            <br />
            <span
              class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Inventory Management
            </span>
          </h1>

          <!-- Subtitle -->
          <p
            class="text-xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Take complete control of your inventory with OpenStock. Manage
            products, track stock levels, handle suppliers, oversee contacts and
            deals—all with real-time analytics and no vendor lock-in.
          </p>

          <!-- CTA Buttons -->
          <div
            class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <NuxtLink
              to="/login"
              class="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-2xl hover:shadow-indigo-500/25 hover:scale-105"
            >
              <Icon name="heroicons:rocket-launch" class="h-5 w-5 mr-2" />
              Start Free Demo
              <div
                class="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"
              ></div>
            </NuxtLink>
            <a
              href="https://github.com"
              class="group inline-flex items-center px-8 py-4 border-2 border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-semibold rounded-xl transition-all duration-300 hover:bg-gray-800/50"
            >
              <Icon name="simple-icons:github" class="h-5 w-5 mr-2" />
              View on GitHub
              <Icon
                name="heroicons:arrow-top-right-on-square"
                class="h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </a>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-1">50K+</div>
              <div class="text-sm text-gray-400">Products Tracked</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-1">1K+</div>
              <div class="text-sm text-gray-400">Active Users</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-1">99.9%</div>
              <div class="text-sm text-gray-400">Uptime</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-1">24/7</div>
              <div class="text-sm text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Features Section -->
    <section class="py-24 bg-gray-900 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-20">
          <h2 class="text-4xl font-bold text-white mb-4">
            Everything You Need for
            <span
              class="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
            >
              Inventory Excellence
            </span>
          </h2>
          <p class="text-xl text-gray-400 max-w-3xl mx-auto">
            Built for businesses that demand reliability, flexibility, and
            complete control over their inventory data.
          </p>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Inventory Management -->
          <div
            class="group relative p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <div
                class="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl w-fit mb-6"
              >
                <Icon name="heroicons:cube" class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-white mb-4">
                Product Catalog & Stock Tracking
              </h3>
              <p class="text-gray-400 leading-relaxed">
                Comprehensive product management with real-time stock levels,
                automatic low-stock alerts, and customizable thresholds for each
                item.
              </p>
            </div>
          </div>

          <!-- Supplier Management -->
          <div
            class="group relative p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <div
                class="p-3 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl w-fit mb-6"
              >
                <Icon
                  name="heroicons:building-office"
                  class="h-8 w-8 text-white"
                />
              </div>
              <h3 class="text-xl font-bold text-white mb-4">
                Vendor Relationship Management
              </h3>
              <p class="text-gray-400 leading-relaxed">
                Manage supplier relationships, track purchase orders, pricing
                information, and automate procurement workflows with intelligent
                reordering.
              </p>
            </div>
          </div>

          <!-- Analytics Dashboard -->
          <div
            class="group relative p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:border-yellow-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/10"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <div
                class="p-3 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl w-fit mb-6"
              >
                <Icon
                  name="heroicons:presentation-chart-line"
                  class="h-8 w-8 text-white"
                />
              </div>
              <h3 class="text-xl font-bold text-white mb-4">
                Inventory & Sales Insights
              </h3>
              <p class="text-gray-400 leading-relaxed">
                Comprehensive analytics with inventory trends, sales performance
                tracking, and predictive insights for demand forecasting.
              </p>
            </div>
          </div>

          <!-- Contact Management -->
          <div
            class="group relative p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <div
                class="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl w-fit mb-6"
              >
                <Icon name="heroicons:users" class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-white mb-4">
                Customer & Prospect Management
              </h3>
              <p class="text-gray-400 leading-relaxed">
                Manage customer relationships, track prospects, and maintain
                detailed contact information with integrated deal pipeline
                tracking.
              </p>
            </div>
          </div>

          <!-- API Integration -->
          <div
            class="group relative p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <div
                class="p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl w-fit mb-6"
              >
                <Icon
                  name="heroicons:code-bracket"
                  class="h-8 w-8 text-white"
                />
              </div>
              <h3 class="text-xl font-bold text-white mb-4">
                REST API & Integrations
              </h3>
              <p class="text-gray-400 leading-relaxed">
                Connect with your existing tools via our comprehensive REST API.
                Integrate with eCommerce platforms, accounting software, and
                more.
              </p>
            </div>
          </div>

          <!-- Open Source -->
          <div
            class="group relative p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <div
                class="p-3 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl w-fit mb-6"
              >
                <Icon name="heroicons:heart" class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-white mb-4">
                100% Open Source
              </h3>
              <p class="text-gray-400 leading-relaxed">
                Complete transparency with full source code access. Self-host
                anywhere, customize freely, and contribute to the community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="py-24 bg-gray-800/50 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-white mb-4">
            Built with Modern Technologies
          </h2>
          <p class="text-gray-400 text-lg">
            Powered by the latest web technologies for performance and
            reliability
          </p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          <div
            class="flex flex-col items-center p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-colors"
          >
            <Icon
              name="simple-icons:nuxtdotjs"
              class="h-10 w-10 text-green-400 mb-3"
            />
            <span class="text-sm font-medium text-gray-300">Nuxt 3</span>
          </div>
          <div
            class="flex flex-col items-center p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-colors"
          >
            <Icon
              name="simple-icons:typescript"
              class="h-10 w-10 text-blue-400 mb-3"
            />
            <span class="text-sm font-medium text-gray-300">TypeScript</span>
          </div>
          <div
            class="flex flex-col items-center p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-colors"
          >
            <Icon
              name="simple-icons:tailwindcss"
              class="h-10 w-10 text-cyan-400 mb-3"
            />
            <span class="text-sm font-medium text-gray-300">Tailwind</span>
          </div>
          <div
            class="flex flex-col items-center p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-violet-500/50 transition-colors"
          >
            <Icon
              name="simple-icons:pocketbase"
              class="h-10 w-10 text-violet-400 mb-3"
            />
            <span class="text-sm font-medium text-gray-300">PocketBase</span>
          </div>
          <div
            class="flex flex-col items-center p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-colors"
          >
            <Icon
              name="simple-icons:vue"
              class="h-10 w-10 text-green-400 mb-3"
            />
            <span class="text-sm font-medium text-gray-300">Vue 3</span>
          </div>
          <div
            class="flex flex-col items-center p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-orange-500/50 transition-colors"
          >
            <Icon
              name="simple-icons:cloudflare"
              class="h-10 w-10 text-orange-400 mb-3"
            />
            <span class="text-sm font-medium text-gray-300">Cloudflare</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      class="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1),transparent_70%)]"
      ></div>
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl sm:text-5xl font-bold text-white mb-6">
          Ready to Take Control of Your
          <span
            class="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
          >
            Inventory?
          </span>
        </h2>
        <p class="text-xl text-gray-400 mb-12 leading-relaxed">
          Join the growing community of businesses using OpenStock to streamline
          their inventory management. Start your free trial today—no credit card
          required.
        </p>

        <div
          class="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <NuxtLink
            to="/login"
            class="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-indigo-500/25 hover:scale-105"
          >
            <Icon name="heroicons:rocket-launch" class="h-6 w-6 mr-3" />
            Start Free Trial
            <div
              class="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"
            ></div>
          </NuxtLink>
          <div class="flex items-center text-gray-400">
            <Icon
              name="heroicons:check-circle"
              class="h-5 w-5 text-green-400 mr-2"
            />
            No credit card required
          </div>
        </div>

        <!-- Trust Indicators -->
        <div
          class="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500"
        >
          <div class="flex items-center">
            <Icon
              name="heroicons:shield-check"
              class="h-5 w-5 text-green-400 mr-2"
            />
            Open Source
          </div>
          <div class="flex items-center">
            <Icon
              name="heroicons:lock-closed"
              class="h-5 w-5 text-blue-400 mr-2"
            />
            Self-Hosted
          </div>
          <div class="flex items-center">
            <Icon
              name="heroicons:code-bracket"
              class="h-5 w-5 text-purple-400 mr-2"
            />
            MIT Licensed
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <!-- Brand -->
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center space-x-3 mb-4">
              <div
                class="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg"
              >
                <Icon name="heroicons:cube" class="h-6 w-6 text-white" />
              </div>
              <div>
                <span
                  class="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                  >StockFlow</span
                >
                <div class="text-xs text-gray-400 -mt-1">Open Source</div>
              </div>
            </div>
            <p class="text-gray-400 max-w-md leading-relaxed">
              The modern, open-source inventory management system that gives you
              complete control over your stock, suppliers, and business
              insights.
            </p>
            <div class="flex items-center space-x-4 mt-6">
              <a
                href="https://github.com"
                class="text-gray-400 hover:text-white transition-colors"
              >
                <Icon name="simple-icons:github" class="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                class="text-gray-400 hover:text-white transition-colors"
              >
                <Icon name="simple-icons:x" class="h-5 w-5" />
              </a>
              <a
                href="https://discord.com"
                class="text-gray-400 hover:text-white transition-colors"
              >
                <Icon name="simple-icons:discord" class="h-5 w-5" />
              </a>
            </div>
          </div>

          <!-- Links -->
          <div>
            <h3 class="text-white font-semibold mb-4">Product</h3>
            <ul class="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors"
                  >Features</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors"
                  >Integrations</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors"
                  >API Docs</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors"
                  >Changelog</a
                >
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-white font-semibold mb-4">Support</h3>
            <ul class="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors"
                  >Documentation</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors"
                  >Community</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors"
                  >Help Center</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors"
                  >Contact</a
                >
              </li>
            </ul>
          </div>
        </div>

        <div
          class="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center"
        >
          <p class="text-gray-400 text-sm">
            © 2024 StockFlow. Open source inventory management for modern
            businesses.
          </p>
          <div class="flex items-center space-x-6 mt-4 sm:mt-0 text-sm">
            <a href="#" class="text-gray-400 hover:text-white transition-colors"
              >Privacy</a
            >
            <a href="#" class="text-gray-400 hover:text-white transition-colors"
              >Terms</a
            >
            <a href="#" class="text-gray-400 hover:text-white transition-colors"
              >License</a
            >
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Set page meta
useHead({
  title: 'OpenStock - Open Source Inventory Management System',
  meta: [
    {
      name: 'description',
      content:
        'An open source inventory management system built with Nuxt 3 and PocketBase. Manage products, suppliers, contacts, and deals with complete control over your data.',
    },
    {
      property: 'og:title',
      content: 'OpenStock - Open Source Inventory Management System',
    },
    {
      property: 'og:description',
      content:
        'Take complete control of your inventory with OpenStock. Manage products, track stock levels, handle suppliers—all with real-time analytics and no vendor lock-in.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
});
</script>

<style scoped>
/* Custom gradient animations */
@keyframes gradient-x {
  0%,
  100% {
    transform: translateX(0%);
  }
  50% {
    transform: translateX(-100%);
  }
}

.animate-gradient-x {
  animation: gradient-x 3s ease infinite;
  background-size: 200% 200%;
}

/* Smooth scrolling for the page */
html {
  scroll-behavior: smooth;
}
</style>
