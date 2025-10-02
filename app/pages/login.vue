<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <!-- Logo and Header -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">
          Cloth Bird
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Access your shops admin panel here
        </p>
      </div>

      <!-- Login Form -->
      <div class="bg-white rounded-lg shadow-md p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div
            v-if="error"
            class="bg-red-50 border border-red-200 rounded-md p-4"
          >
            <div class="flex">
              <Icon
                name="heroicons:exclamation-triangle"
                class="h-5 w-5 text-red-400"
              />
              <div class="ml-3">
                <p class="text-sm text-red-800">{{ error }}</p>
              </div>
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1 relative">
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <Icon name="heroicons:envelope" class="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div class="mt-1 relative">
              <input
                id="password"
                v-model="form.password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your password"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="text-gray-400 hover:text-gray-600"
                >
                  <Icon
                    :name="
                      showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'
                    "
                    class="h-5 w-5"
                  />
                </button>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="form.remember"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span
                v-if="loading"
                class="absolute left-0 inset-y-0 flex items-center pl-3"
              >
                <div
                  class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"
                ></div>
              </span>
              <span
                v-else
                class="absolute left-0 inset-y-0 flex items-center pl-3"
              >
                <Icon
                  name="heroicons:lock-closed"
                  class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                />
              </span>
              {{ loading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
        </form>
      </div>      
    </div>
  </div>
</template>

<script setup lang="ts">
// Set page meta and middleware
definePageMeta({
  middleware: 'guest',
});

useHead({
  title: 'Login - OpenStock',
  meta: [
    {
      name: 'description',
      content:
        'Sign in to your OpenStock account to access your inventory dashboard.',
    },
  ],
});

// Auth store
const { login } = useAuthStore();

// Form state
const form = ref({
  email: '',
  password: '',
  remember: false,
});

const loading = ref(false);
const error = ref('');
const showPassword = ref(false);

// Handle login
const handleLogin = async () => {
  if (!form.value.email || !form.value.password) {
    error.value = 'Please fill in all fields';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    await login(form.value.email, form.value.password);
    await navigateTo('/');
  } catch (err: any) {
    error.value = err.message || 'Login failed. Please check your credentials.';
  } finally {
    loading.value = false;
  }
};

// Auth redirect is handled by middleware
</script>
