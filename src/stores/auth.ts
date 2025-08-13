import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface User {
  id: string
  email: string
  display_name: string
  created_at?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => user.value !== null)
  const loading = ref(false)
  const error = ref('')

  function login(data: any) {
    loading.value = true
    error.value = ''
    try {
      user.value = {
        id: data.user.id,
        email: data.user.email,
        display_name: data.user.display_name,
        created_at: data.user.created_at
      }
      localStorage.setItem('user', JSON.stringify(user.value))
    } catch (err: any) {
      error.value = err.message || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    error.value = ''
    localStorage.removeItem('user')
  }

  function checkAuth() {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
      return true
    }
    return false
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    checkAuth
  }
})