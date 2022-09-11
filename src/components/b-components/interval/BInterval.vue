<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BInterval',
  showName: '轮询',
  icon: 'interval',
  category: '功能',
})
</script>

<script setup lang="ts">
import { useInterval } from '@/hooks/common'

useInterval(() => {
  console.log('BInterval')
}, 1000)
</script>

<template/>
