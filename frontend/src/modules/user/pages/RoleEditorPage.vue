<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

const roles = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await api.get('/v1/roles')
    roles.value = data
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Roles & Permissions</h1>
      <Button label="Create Role" icon="pi pi-plus" />
    </div>
    <DataTable :value="roles" :loading="loading">
      <Column field="name" header="Role" sortable />
      <Column field="description" header="Description" />
      <Column field="system" header="System">
        <template #body="{ data }">
          <Tag :value="data.system ? 'Yes' : 'No'" :severity="data.system ? 'info' : 'contrast'" />
        </template>
      </Column>
      <Column header="Permissions">
        <template #body="{ data }">
          <div style="display: flex; flex-wrap: wrap; gap: 0.25rem">
            <Tag v-for="p in data.permissions" :key="p.id" :value="p.code" severity="info" style="font-size: 0.7rem" />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
