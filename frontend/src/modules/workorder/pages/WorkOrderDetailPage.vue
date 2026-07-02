<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'

const route = useRoute()
const router = useRouter()
const wo = ref<any>({})
const tasks = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await api.get(`/v1/work-orders/${route.params.id}`)
    wo.value = data
    const { data: t } = await api.get(`/v1/work-orders/${route.params.id}/tasks`)
    tasks.value = t
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="!loading">
    <div class="page-header">
      <div style="display: flex; align-items: center; gap: 0.75rem">
        <Button icon="pi pi-arrow-left" text rounded @click="router.push('/app/work-orders')" />
        <h1>{{ wo.woNumber || 'Loading...' }}</h1>
        <Tag :value="wo.status" />
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem">
      <Card>
        <template #title>Details</template>
        <template #content>
          <p><strong>Title:</strong> {{ wo.title }}</p>
          <p><strong>Type:</strong> {{ wo.type }}</p>
          <p><strong>Priority:</strong> {{ wo.priority }}</p>
          <p><strong>Target Date:</strong> {{ wo.targetDate }}</p>
        </template>
      </Card>
      <Card>
        <template #title>Assignment</template>
        <template #content>
          <p><strong>Status:</strong> {{ wo.status }}</p>
          <p><strong>Estimated Hours:</strong> {{ wo.estimatedHours }}</p>
          <p><strong>Actual Hours:</strong> {{ wo.actualHours }}</p>
        </template>
      </Card>
    </div>

    <Tabs value="0">
      <TabList>
        <Tab value="0">Tasks</Tab>
        <Tab value="1">Description</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <DataTable :value="tasks">
            <Column field="sequence" header="#" style="width: 60px" />
            <Column field="description" header="Task" />
            <Column field="status" header="Status">
              <template #body="{ data }">
                <Tag :value="data.status" />
              </template>
            </Column>
            <Column field="estimatedHours" header="Est. Hours" />
          </DataTable>
        </TabPanel>
        <TabPanel value="1">
          <p>{{ wo.description || 'No description provided.' }}</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
