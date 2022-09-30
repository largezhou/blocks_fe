<script lang="ts">
import { defineComponent } from 'vue'
import { settings, eventSetting } from './settings'

export default defineComponent({
  name: 'BTimeout',
  showName: '延迟执行',
  icon: 'timeout',
  category: '功能',
  minHeightUnit: 0,
  minWidthUnit: 0,
  settings,
  eventSetting,
})
</script>

<script setup lang="ts">
import { useTimeout } from '@/hooks/common'

const props = defineProps({
  time: {
    type: null,
    default: 1000,
    validator: (prop: Number) => prop >= 0,
  },
})

const emits = defineEmits<{
  (e: 'timeout'): void
}>()

const ins = getCurrentInstance()
const startTimeout = () => {
  useTimeout(ins, () => {
    emits('timeout')
  }, props.time)
}

defineExpose({
  startTimeout,
})
</script>

<template/>
