<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Button from 'primevue/button'

const orders = ref<any[]>([])
const loading = ref(true)

const statusSeverity: Record<string, string> = {
  draft: 'contrast', pending_approval: 'warn', approved: 'info',
  sent: 'info', partially_received: 'warn', received: 'success',
  cancelled: 'danger', rejected: 'danger'
}

onMounted(async () => {
  try {
    const { data } = await api.get('/v1/purchase-orders')
    orders.value = data
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Purchase Orders</h1>
      <Button label="New PO" icon="pi pi-plus" />
    </div>
    <DataTable :value="orders" :loading="loading" paginator :rows="20">
      <Column field="poNumber" header="PO#" sortable />
      <Column field="status" header="Status" sortable>
        <template #body="{ data }">
          <Tag :value="data.status.replace('_', ' ')" :severity="statusSeverity[data.status] || 'info'" />
        </template>
      </Column>
      <Column field="orderDate" header="Order Date" sortable />
      <Column field="totalAmount" header="Total">
        <template #body="{ data }">${{ data.totalAmount?.toFixed(2) }}</template>
      </Column>
      <Column field="paymentTerms" header="Terms" />
    </DataTable>
  </div>
</template>
