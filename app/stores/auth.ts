import { defineStore } from 'pinia';

interface User {
  id: string;
  email: string;
  name?: string;
  admin: boolean;
  emailVisibility: boolean;
  verified: boolean;
  created: string;
  updated: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface UserResponse {
  id: string;
  email: string;
  name?: string;
  admin: boolean;
  emailVisibility: boolean;
  verified: boolean;
  created: string;
  updated: string;
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null);
  const token = ref<string>('');
  const isAuthenticated = computed(() => !!user.value && !!token.value);
  const isAdmin = computed(() => user.value?.admin === true);

  // Actions
  const login = async (email: string, password: string) => {
    try {
      const response = await $fetch<AuthResponse>('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      });

      user.value = response.user;
      token.value = response.token;

      return response;
    } catch (error: any) {
      console.error('Login failed:', error);
      throw new Error(error.data?.message || error.message || 'Login failed');
    }
  };

  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      user.value = null;
      token.value = '';
    }
  };

  const checkAuth = async () => {
    try {
      const userData = await $fetch<UserResponse>('/api/auth/me');
      user.value = userData;
      return true;
    } catch (error) {
      user.value = null;
      token.value = '';
      return false;
    }
  };

  const refresh = async () => {
    try {
      const userData = await $fetch<UserResponse>('/api/auth/me');
      user.value = userData;
      return userData;
    } catch (error) {
      console.error('Auth refresh failed:', error);
      user.value = null;
      token.value = '';
      throw error;
    }
  };

  return {
    // State
    user,
    token,
    isAuthenticated,
    isAdmin,

    // Actions
    login,
    logout,
    checkAuth,
    refresh,
  };
});
