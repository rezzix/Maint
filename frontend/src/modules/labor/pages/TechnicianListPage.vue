<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Button from 'primevue/button'

const techs = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await api.get('/v1/technicians')
    techs.value = data
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Technicians</h1>
      <Button label="Add Technician" icon="pi pi-plus" />
    </div>
    <DataTable :value="techs" :loading="loading" paginator :rows="20">
      <Column field="employeeCode" header="Code" sortable />
      <Column field="jobTitle" header="Job Title" />
      <Column field="department" header="Department" />
      <Column field="shift" header="Shift" />
      <Column field="status" header="Status">
        <template #body="{ data }">
          <i :class="'pi pi-circle-fill'"
             :style="{ color: data.status === 'available' ? 'green' : data.status === 'busy' ? 'orange' : 'gray', marginRight: '0.25rem', fontSize: '0.75rem' }"></i>
          {{ data.status }}
        </template>
      </Column>
      <Column field="hourlyRate" header="Rate">
        <template #body="{ data }">${{ data.hourlyRate?.toFixed(2) }}/hr</template>
      </Column>
    </DataTable>
  </div>
</template>
