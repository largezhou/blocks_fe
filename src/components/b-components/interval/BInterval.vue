<script lang="ts">
import { defineComponent } from 'vue'
import settings from './settings'

export default defineComponent({
  name: 'BInterval',
  showName: '轮询',
  icon: 'interval',
  category: '功能',
  minHeightUnit: 0,
  minWidthUnit: 0,
  settings,
})
</script>

<script setup lang="ts">
import { useInterval } from '@/hooks/common'
import { getCurrentInstance } from 'vue'

const props = defineProps({
  time: {
    type: null,
    default: 1000,
    validator: (prop: Number) => prop >= 1,
  },
})

const emits = defineEmits<{
  (e: 'interval'): void
}>()

useInterval(getCurrentInstance(), () => {
  emits('interval')
  console.log('BInterval')
}, props.time)
</script>

<template/>
