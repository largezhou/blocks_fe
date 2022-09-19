<script lang="ts">
import { defineComponent } from 'vue'
import settings from './settings'

export default defineComponent({
  name: 'BTimeout',
  showName: '定时器',
  icon: 'timeout',
  category: '功能',
  minHeightUnit: 0,
  minWidthUnit: 0,
  settings,
  eventSetting: {
    action: {
      startTimeout: {
        showName: '开始倒计时',
        method: 'startTimeout',
      },
    },
    trigger: {
      timeout: {
        showName: '倒计时结束',
        event: 'timeout',
      },
    },
  },
})
</script>

<script setup lang="ts">
import { useTimeout } from '@/hooks/common'
import { getCurrentInstance } from 'vue'

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
