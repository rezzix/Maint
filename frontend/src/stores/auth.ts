import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const tenantId = ref<string | null>(null)
  const userId = ref<string | null>(null)
  const email = ref<string | null>(null)
  const name = ref<string | null>(null)
  const roles = ref<string[]>([])

  const isAuthenticated = computed(() => !!accessToken.value)
  const isDev = computed(() => import.meta.env.DEV)

  function setAuth(data: {
    accessToken: string
    refreshToken: string
    tenantId: string
    userId: string
    email: string
    name: string
    roles: string[]
  }) {
    accessToken.value = data.accessToken
    refreshToken.value = data.refreshToken
    tenantId.value = data.tenantId
    userId.value = data.userId
    email.value = data.email
    name.value = data.name
    roles.value = data.roles
    saveToStorage()
  }

  function saveToStorage() {
    localStorage.setItem('accessToken', accessToken.value || '')
    localStorage.setItem('refreshToken', refreshToken.value || '')
    localStorage.setItem('tenantId', tenantId.value || '')
    localStorage.setItem('userId', userId.value || '')
  }

  function loadFromStorage() {
    const token = localStorage.getItem('accessToken')
    if (token) {
      accessToken.value = token
      refreshToken.value = localStorage.getItem('refreshToken')
      tenantId.value = localStorage.getItem('tenantId')
      userId.value = localStorage.getItem('userId')
    }
  }

  async function login(email: string, password: string) {
    const { data } = await api.post('/auth/login', { email, password })
    setAuth(data)
    router.push('/app/dashboard')
  }

  async function devLogin(userId: string) {
    const { data } = await api.post(`/dev/login/${userId}`)
    setAuth(data)
    router.push('/app/dashboard')
  }

  function logout() {
    accessToken.value = null
    refreshToken.value = null
    tenantId.value = null
    userId.value = null
    email.value = null
    name.value = null
    roles.value = []
    localStorage.clear()
    router.push('/login')
  }

  return {
    accessToken, refreshToken, tenantId, userId, email, name, roles,
    isAuthenticated, isDev, setAuth, loadFromStorage, login, devLogin, logout
  }
})
