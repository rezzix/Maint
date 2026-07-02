<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Button from 'primevue/button'

const tenants = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await api.get('/v1/tenants')
    tenants.value = data
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Tenants</h1>
      <Button label="New Tenant" icon="pi pi-plus" />
    </div>
    <DataTable :value="tenants" :loading="loading">
      <Column field="name" header="Name" sortable />
      <Column field="slug" header="Slug" />
      <Column field="tier" header="Tier">
        <template #body="{ data }">
          <Tag :value="data.tier" :severity="data.tier === 'enterprise' ? 'danger' : data.tier === 'standard' ? 'info' : 'contrast'" />
        </template>
      </Column>
      <Column field="status" header="Status">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="data.status === 'active' ? 'success' : 'warn'" />
        </template>
      </Column>
      <Column field="maxUsers" header="Max Users" />
      <Column field="maxAssets" header="Max Assets" />
    </DataTable>
  </div>
</template>
