<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/services/api'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Message from 'primevue/message'
import Password from 'primevue/password'

const auth = useAuthStore()
const email = ref('')
const password = ref('')
const error = ref('')
const devUsers = ref<any[]>([])
const loading = ref(false)

onMounted(async () => {
  if (auth.isDev) {
    try {
      const { data } = await api.get('/dev/users')
      devUsers.value = data
    } catch { /* not in dev mode or backend unavailable */ }
  }
})

async function handleLogin() {
  if (!email.value || !password.value) return
  loading.value = true
  error.value = ''
  try {
    await auth.login(email.value, password.value)
  } catch {
    error.value = 'Invalid email or password'
  } finally {
    loading.value = false
  }
}

async function handleDevLogin(userId: string) {
  await auth.devLogin(userId)
}
</script>

<template>
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center;
              background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 2rem">
    <div style="width: 100%; max-width: 480px">
      <div style="text-align: center; margin-bottom: 2rem; color: white">
        <i class="pi pi-cog" style="font-size: 2.5rem; margin-bottom: 0.5rem"></i>
        <h1 style="font-size: 1.75rem; font-weight: 700">Maint CMMS</h1>
        <p style="opacity: 0.8">Computerized Maintenance Management System</p>
      </div>

      <template v-if="devUsers.length > 0">
        <h3 style="color: white; margin-bottom: 1rem; text-align: center">Quick Login (Dev)</h3>
        <div class="card-grid">
          <template v-for="tenant in devUsers" :key="tenant.tenantId">
            <template v-for="roleGroup in tenant.roles" :key="roleGroup.role">
              <Card
                v-for="user in roleGroup.users"
                :key="user.id"
                class="quick-login-card"
                @click="handleDevLogin(user.id)"
              >
                <template #title>
                  <div style="display: flex; align-items: center; gap: 0.5rem">
                    <i class="pi pi-user" style="font-size: 1.25rem"></i>
                    <span>{{ user.name }}</span>
                  </div>
                </template>
                <template #content>
                  <p style="font-size: 0.8rem; color: var(--p-surface-500)">{{ user.email }}</p>
                  <span :class="'p-tag p-tag-' + (roleGroup.role === 'ADMIN' ? 'danger' : roleGroup.role === 'TECHNICIAN' ? 'info' : 'warn')"
                        style="font-size: 0.75rem; padding: 0.15rem 0.5rem; border-radius: 4px">
                    {{ roleGroup.role }}
                  </span>
                </template>
              </Card>
            </template>
          </template>
        </div>
      </template>

      <template v-else>
        <Card>
          <template #title><h3 style="text-align: center">Sign In</h3></template>
          <template #content>
            <div style="display: flex; flex-direction: column; gap: 1rem">
              <div v-if="error"><Message severity="error">{{ error }}</Message></div>
              <div>
                <label style="display: block; margin-bottom: 0.25rem; font-size: 0.875rem">Email</label>
                <InputText v-model="email" type="email" placeholder="Enter your email" style="width: 100%" />
              </div>
              <div>
                <label style="display: block; margin-bottom: 0.25rem; font-size: 0.875rem">Password</label>
                <Password v-model="password" :feedback="false" placeholder="Enter your password" style="width: 100%" />
              </div>
              <Button label="Sign In" icon="pi pi-sign-in" @click="handleLogin" :loading="loading" style="width: 100%" />
            </div>
          </template>
        </Card>
      </template>
    </div>
  </div>
</template>
