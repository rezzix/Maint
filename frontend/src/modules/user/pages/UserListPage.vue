<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Button from 'primevue/button'

const users = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await api.get('/v1/users')
    users.value = data
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Users</h1>
      <Button label="Invite User" icon="pi pi-plus" />
    </div>
    <DataTable :value="users" :loading="loading" paginator :rows="20">
      <Column field="email" header="Email" sortable />
      <Column field="firstName" header="First Name" />
      <Column field="lastName" header="Last Name" />
      <Column field="status" header="Status">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="data.status === 'active' ? 'success' : 'contrast'" />
        </template>
      </Column>
      <Column header="Roles">
        <template #body="{ data }">
          <Tag v-for="r in data.roles" :key="r.id" :value="r.name" style="margin-right: 0.25rem" />
        </template>
      </Column>
      <Column field="lastLoginAt" header="Last Login" />
    </DataTable>
  </div>
</template>
