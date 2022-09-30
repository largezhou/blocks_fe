<script lang="ts">
import { defineComponent } from 'vue'
import { settings, eventSetting } from './settings'

export default defineComponent({
  name: 'BContent',
  showName: '自定义内容',
  minWidthUnit: 0,
  minHeightUnit: 0,
  icon: 'text',
  category: '通用',
  settings,
  eventSetting,
})
</script>

<script setup lang="ts">
import { safeJsonParse } from '@/libs/utils'

const props = defineProps<{
  value?: string
  isJson?: boolean
}>()

const emits = defineEmits<{
  (e: 'update:value', val?: string): void
}>()

const inputValue = computed({
  get() {
    return props.isJson ? safeJsonParse(props.value) : props.value
  },
  set(v?: any): void {
    emits('update:value', typeof v === 'string' ? v : JSON.stringify(v))
  },
})

defineExpose({
  inputValue,
})
</script>

<template/>
