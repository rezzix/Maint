<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'

const items = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await api.get('/v1/inventory/low-stock')
    items.value = data
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Low Stock Items</h1>
    </div>
    <DataTable :value="items" :loading="loading">
      <Column field="id" header="Stock ID" />
      <Column field="quantityOnHand" header="On Hand">
        <template #body="{ data }">
          <Tag :value="data.quantityOnHand" severity="danger" />
        </template>
      </Column>
      <Column field="reorderPoint" header="Reorder Point" />
      <Column field="reorderQuantity" header="Reorder Qty" />
      <Column field="binLocation" header="Bin Location" />
    </DataTable>
  </div>
</template>
