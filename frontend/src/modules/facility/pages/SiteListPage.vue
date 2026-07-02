<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Button from 'primevue/button'

const sites = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await api.get('/v1/sites')
    sites.value = data
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Sites</h1>
      <Button label="New Site" icon="pi pi-plus" />
    </div>
    <DataTable :value="sites" :loading="loading">
      <Column field="code" header="Code" sortable />
      <Column field="name" header="Name" sortable />
      <Column field="city" header="City" />
      <Column field="state" header="State" />
      <Column field="country" header="Country" />
      <Column field="status" header="Status">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="data.status === 'active' ? 'success' : 'contrast'" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
