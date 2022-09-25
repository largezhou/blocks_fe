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
import { computed, ref } from 'vue'
import { safeJsonParse } from '@/libs/utils'

const props = defineProps<{
  text?: string
  isJson?: boolean
}>()

const inputText = ref(props.text)

const inputValue = computed({
  get() {
    return props.isJson ? safeJsonParse(inputText.value) : inputText.value
  },
  set(v?: any): void {
    if (typeof v === 'string') {
      inputText.value = v
    } else if (props.isJson) {
      inputText.value = JSON.stringify(v)
    }
  },
})

defineExpose({
  inputValue,
})
</script>

<template/>
