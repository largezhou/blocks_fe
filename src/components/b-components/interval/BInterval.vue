<script lang="ts">
import { settings, eventSetting } from './settings'

export default defineComponent({
  name: 'BInterval',
  showName: '定时执行',
  icon: 'interval',
  category: '功能',
  minHeightUnit: 0,
  minWidthUnit: 0,
  settings,
  eventSetting,
})
</script>

<script setup lang="ts">
import { useInterval } from '@/hooks/common'

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
}, props.time)
</script>

<template/>
