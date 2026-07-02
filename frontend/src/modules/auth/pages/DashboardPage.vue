<script setup lang="ts">
import Card from 'primevue/card'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const stats = [
  { label: 'Active Work Orders', value: '12', icon: 'pi pi-wrench', color: '#3b82f6' },
  { label: 'Assets', value: '28', icon: 'pi pi-box', color: '#10b981' },
  { label: 'Open PM Plans', value: '8', icon: 'pi pi-calendar-clock', color: '#f59e0b' },
  { label: 'Low Stock Items', value: '3', icon: 'pi pi-exclamation-triangle', color: '#ef4444' }
]
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Dashboard</h1>
    </div>
    <div class="card-grid">
      <Card v-for="s in stats" :key="s.label">
        <template #content>
          <div style="display: flex; align-items: center; gap: 1rem">
            <div :style="{ background: s.color, width: '48px', height: '48px', borderRadius: '12px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center' }">
              <i :class="s.icon" style="color: white; font-size: 1.25rem; font-weight: 600"></i>
            </div>
            <div>
              <p style="font-size: 0.8rem; color: var(--p-surface-500)">{{ s.label }}</p>
              <p style="font-size: 1.5rem; font-weight: 700">{{ s.value }}</p>
            </div>
          </div>
        </template>
      </Card>
    </div>
    <Card style="margin-top: 1.5rem">
      <template #title>Recent Work Orders</template>
      <template #content>
        <p style="color: var(--p-surface-400); text-align: center; padding: 2rem">
          No recent work orders. Create one from the Work Orders page.
        </p>
      </template>
    </Card>
  </div>
</template>
