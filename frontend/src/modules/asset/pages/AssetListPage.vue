<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Select from 'primevue/select'

const assets = ref<any[]>([])
const loading = ref(true)
const statusFilter = ref('')

onMounted(async () => {
  try {
    const { data } = await api.get('/v1/assets')
    assets.value = data
  } finally {
    loading.value = false
  }
})

const statusSeverity: Record<string, string> = {
  operational: 'success', 'under-maintenance': 'warn',
  broken: 'danger', retired: 'contrast'
}

const criticalitySeverity: Record<string, string> = {
  low: 'info', medium: 'warn', high: 'danger', critical: 'danger'
}
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Assets</h1>
      <Button label="Register Asset" icon="pi pi-plus" />
    </div>
    <div style="margin-bottom: 1rem">
      <Select v-model="statusFilter" :options="['','operational','under-maintenance','broken','retired']" placeholder="Status" />
    </div>
    <DataTable :value="assets" :loading="loading" paginator :rows="20">
      <Column field="assetTag" header="Tag" sortable />
      <Column field="name" header="Name" sortable />
      <Column field="manufacturer" header="Manufacturer" />
      <Column field="status" header="Status" sortable>
        <template #body="{ data }">
          <Tag :value="data.status" :severity="statusSeverity[data.status] || 'info'" />
        </template>
      </Column>
      <Column field="criticality" header="Criticality" sortable>
        <template #body="{ data }">
          <Tag :value="data.criticality" :severity="criticalitySeverity[data.criticality] || 'info'" />
        </template>
      </Column>
      <Column field="serialNumber" header="Serial #" />
    </DataTable>
  </div>
</template>
