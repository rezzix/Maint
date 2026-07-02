<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Button from 'primevue/button'

const plans = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await api.get('/v1/pm-plans')
    plans.value = data
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Preventive Maintenance Plans</h1>
      <Button label="New PM Plan" icon="pi pi-plus" />
    </div>
    <DataTable :value="plans" :loading="loading" paginator :rows="20">
      <Column field="name" header="Name" sortable />
      <Column field="priority" header="Priority">
        <template #body="{ data }">
          <Tag :value="data.priority" :severity="data.priority === 'critical' ? 'danger' : data.priority === 'high' ? 'warn' : 'info'" />
        </template>
      </Column>
      <Column field="status" header="Status">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="data.status === 'active' ? 'success' : 'contrast'" />
        </template>
      </Column>
      <Column field="requiresShutdown" header="Requires Shutdown">
        <template #body="{ data }">
          <i :class="data.requiresShutdown ? 'pi pi-check' : 'pi pi-times'"></i>
        </template>
      </Column>
      <Column field="estimatedDurationMinutes" header="Duration (min)" />
    </DataTable>
  </div>
</template>
