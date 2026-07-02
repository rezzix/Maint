<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const sidebarCollapsed = ref(false)

const menuItems = [
  { label: 'Dashboard', icon: 'pi pi-home', to: '/app/dashboard' },
  { label: 'Work Orders', icon: 'pi pi-wrench', to: '/app/work-orders' },
  { label: 'PM Plans', icon: 'pi pi-calendar-clock', to: '/app/pm-plans' },
  { label: 'Assets', icon: 'pi pi-box', to: '/app/assets' },
  { label: 'Parts', icon: 'pi pi-database', to: '/app/inventory/parts' },
  { label: 'Low Stock', icon: 'pi pi-exclamation-triangle', to: '/app/inventory/low-stock' },
  { label: 'Purchase Orders', icon: 'pi pi-shopping-cart', to: '/app/purchasing/orders' },
  { label: 'Vendors', icon: 'pi pi-building', to: '/app/vendors' },
  { label: 'Sites', icon: 'pi pi-map', to: '/app/facilities/sites' },
  { label: 'Technicians', icon: 'pi pi-users', to: '/app/technicians' },
  { label: 'Users', icon: 'pi pi-user', to: '/app/users' },
  { label: 'Roles', icon: 'pi pi-shield', to: '/app/roles' },
  { label: 'Tenants', icon: 'pi pi-globe', to: '/app/tenants' },
  { label: 'Audit Logs', icon: 'pi pi-history', to: '/app/audit/logs' }
]
</script>

<template>
  <div class="app-shell">
    <aside :class="['sidebar', { collapsed: sidebarCollapsed }]">
      <div class="sidebar-header">
        <i class="pi pi-cog" style="font-size: 1.5rem"></i>
        <span v-if="!sidebarCollapsed" style="font-weight: 600">Maint CMMS</span>
      </div>
      <nav class="sidebar-nav">
        <router-link
          v-for="item in menuItems"
          :key="item.to"
          :to="item.to"
          v-tooltip.left="sidebarCollapsed ? item.label : undefined"
        >
          <i :class="item.icon"></i>
          <span v-if="!sidebarCollapsed">{{ item.label }}</span>
        </router-link>
      </nav>
      <div class="sidebar-header" style="border-top: 1px solid rgba(255,255,255,0.1); border-bottom: none">
        <i class="pi pi-sign-out" style="cursor: pointer" @click="auth.logout()"></i>
        <span v-if="!sidebarCollapsed" style="font-size: 0.8rem; cursor: pointer" @click="auth.logout()">Logout</span>
      </div>
    </aside>

    <div class="main-area">
      <header class="topbar">
        <div style="display: flex; align-items: center; gap: 0.75rem">
          <i class="pi pi-bars" style="cursor: pointer; font-size: 1.25rem"
             @click="sidebarCollapsed = !sidebarCollapsed"></i>
          <span style="font-weight: 500; color: var(--p-surface-600)">{{ route.meta?.title || route.name }}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem">
          <i class="pi pi-bell" style="font-size: 1.25rem; color: var(--p-surface-500)"></i>
          <span style="font-size: 0.875rem">{{ auth.name || auth.email }}</span>
        </div>
      </header>
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>
