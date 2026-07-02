<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Button from 'primevue/button'

const parts = ref<any[]>([])
const stockMap = ref<Record<string, any[]>>({})
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await api.get('/v1/inventory/parts')
    parts.value = data
    for (const p of parts.value) {
      try {
        const { data: s } = await api.get(`/v1/inventory/parts/${p.id}/stock`)
        stockMap.value[p.id] = s
      } catch { /* skip */ }
    }
  } finally {
    loading.value = false
  }
})

function totalOnHand(partId: string) {
  return stockMap.value[partId]?.reduce((s, l) => s + (l.quantityOnHand || 0), 0) || 0
}
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Parts Inventory</h1>
      <Button label="New Part" icon="pi pi-plus" />
    </div>
    <DataTable :value="parts" :loading="loading" paginator :rows="20">
      <Column field="partNumber" header="Part #" sortable />
      <Column field="name" header="Name" sortable />
      <Column field="category" header="Category" />
      <Column field="manufacturer" header="Manufacturer" />
      <Column header="Qty On Hand">
        <template #body="{ data }">
          <span :style="{ color: totalOnHand(data.id) <= 0 ? 'red' : 'inherit', fontWeight: 600 }">
            {{ totalOnHand(data.id) }}
          </span>
        </template>
      </Column>
      <Column field="unitCost" header="Unit Cost">
        <template #body="{ data }">${{ data.unitCost?.toFixed(2) }}</template>
      </Column>
      <Column field="status" header="Status">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="data.status === 'active' ? 'success' : 'contrast'" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
