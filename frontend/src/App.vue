<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import AppLayout from '@/layouts/AppLayout.vue'

const auth = useAuthStore()
auth.loadFromStorage()
</script>

<template>
  <router-view />
</template>
