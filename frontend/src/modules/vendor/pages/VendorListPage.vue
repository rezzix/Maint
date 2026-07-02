<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Button from 'primevue/button'

const vendors = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await api.get('/v1/vendors')
    vendors.value = data
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Vendors</h1>
      <Button label="New Vendor" icon="pi pi-plus" />
    </div>
    <DataTable :value="vendors" :loading="loading" paginator :rows="20">
      <Column field="code" header="Code" sortable />
      <Column field="name" header="Name" sortable />
      <Column field="category" header="Category" />
      <Column field="status" header="Status">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="data.status === 'active' ? 'success' : 'contrast'" />
        </template>
      </Column>
      <Column field="paymentTermsDays" header="Payment Terms">
        <template #body="{ data }">{{ data.paymentTermsDays }} days</template>
      </Column>
      <Column field="currency" header="Currency" />
    </DataTable>
  </div>
</template>
