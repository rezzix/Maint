<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import Button from 'primevue/button'
import Card from 'primevue/card'

const router = useRouter()
const form = ref({
  title: '', description: '', type: 'corrective', priority: 'medium',
  assetId: null, siteId: null, targetDate: ''
})
const saving = ref(false)

async function save() {
  saving.value = true
  try {
    const { data } = await api.post('/v1/work-orders', form.value)
    router.push(`/app/work-orders/${data.id}`)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div>
    <div class="page-header">
      <h1>New Work Order</h1>
      <Button label="Cancel" text @click="router.back()" />
    </div>
    <Card>
      <template #content>
        <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px">
          <div>
            <label style="display: block; margin-bottom: 0.25rem">Title</label>
            <InputText v-model="form.title" style="width: 100%" />
          </div>
          <div>
            <label style="display: block; margin-bottom: 0.25rem">Description</label>
            <Textarea v-model="form.description" rows="4" style="width: 100%" />
          </div>
          <div style="display: flex; gap: 1rem">
            <div style="flex: 1">
              <label style="display: block; margin-bottom: 0.25rem">Type</label>
              <Select v-model="form.type" :options="['corrective','preventive','predictive','emergency']" style="width: 100%" />
            </div>
            <div style="flex: 1">
              <label style="display: block; margin-bottom: 0.25rem">Priority</label>
              <Select v-model="form.priority" :options="['low','medium','high','critical']" style="width: 100%" />
            </div>
          </div>
          <div>
            <label style="display: block; margin-bottom: 0.25rem">Target Date</label>
            <InputText v-model="form.targetDate" type="date" style="width: 100%" />
          </div>
          <Button label="Create Work Order" icon="pi pi-check" @click="save" :loading="saving" style="width: fit-content" />
        </div>
      </template>
    </Card>
  </div>
</template>
