<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'

const router = useRouter()
const orders = ref<any[]>([])
const loading = ref(true)
const filters = ref({ status: '', priority: '', search: '' })

const statusSeverity: Record<string, string> = {
  open: 'info', assigned: 'info', 'in-progress': 'warn',
  completed: 'success', closed: 'contrast', cancelled: 'danger'
}

onMounted(async () => {
  try {
    const { data } = await api.get('/v1/work-orders')
    orders.value = data
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Work Orders</h1>
      <Button label="New Work Order" icon="pi pi-plus" @click="router.push('/app/work-orders/new')" />
    </div>

    <div style="display: flex; gap: 0.75rem; margin-bottom: 1rem">
      <InputText v-model="filters.search" placeholder="Search..." style="width: 200px" />
      <Select v-model="filters.status" :options="['','open','assigned','in-progress','completed','closed']" placeholder="Status" />
      <Select v-model="filters.priority" :options="['','low','medium','high','critical']" placeholder="Priority" />
    </div>

    <DataTable :value="orders" :loading="loading" paginator :rows="20" sortField="createdAt" :sortOrder="-1">
      <Column field="woNumber" header="WO#" sortable />
      <Column field="title" header="Title" sortable style="min-width: 200px" />
      <Column field="priority" header="Priority" sortable>
        <template #body="{ data }">
          <Tag :value="data.priority" :severity="data.priority === 'critical' ? 'danger' : data.priority === 'high' ? 'warn' : 'info'" />
        </template>
      </Column>
      <Column field="status" header="Status" sortable>
        <template #body="{ data }">
          <Tag :value="data.status" :severity="statusSeverity[data.status] || 'info'" />
        </template>
      </Column>
      <Column field="targetDate" header="Target Date" sortable />
      <Column header="Actions" style="width: 100px">
        <template #body="{ data }">
          <Button icon="pi pi-eye" text rounded @click="router.push(`/app/work-orders/${data.id}`)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
