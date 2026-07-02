<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'

const logs = ref<any[]>([])
const loading = ref(true)
const entityFilter = ref('')

onMounted(async () => {
  try {
    const { data } = await api.get('/v1/audit-logs')
    logs.value = data
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Audit Logs</h1>
    </div>
    <div style="display: flex; gap: 0.75rem; margin-bottom: 1rem">
      <Select v-model="entityFilter" :options="['','WorkOrder','Asset','User','PurchaseOrder']" placeholder="Entity Type" />
      <InputText placeholder="Entity ID" style="width: 250px" />
    </div>
    <DataTable :value="logs" :loading="loading" paginator :rows="20" sortField="createdAt" :sortOrder="-1">
      <Column field="createdAt" header="Timestamp" sortable />
      <Column field="entityType" header="Entity" />
      <Column field="eventType" header="Event">
        <template #body="{ data }">
          <Tag :value="data.eventType" :severity="data.eventType === 'CREATE' ? 'success' : data.eventType === 'DELETE' ? 'danger' : 'info'" />
        </template>
      </Column>
      <Column field="action" header="Action" />
      <Column field="performedBy" header="User" />
      <Column field="sourceIp" header="IP Address" />
    </DataTable>
  </div>
</template>
