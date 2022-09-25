<script lang="ts">
import { defineComponent } from 'vue'
import { settings, eventSetting } from './settings'

export default defineComponent({
  name: 'BAssign',
  showName: '赋值',
  minWidthUnit: 0,
  minHeightUnit: 0,
  icon: 'assign',
  category: '赋值',
  settings,
  eventSetting,
})
</script>

<script setup lang="ts">
import { ComponentPublicInstance, inject, Ref } from 'vue'
import { KeyValue } from '@/types/common'

interface DataSource {
  id?: string
  content?: any
}

const props = defineProps<{
  in?: DataSource,
  out?: DataSource,
}>()

const compRefMap = inject<Ref<KeyValue<ComponentPublicInstance | undefined>>>('compRefMap')

const assign = () => {
  const inRef = compRefMap?.value[props.in?.id as string]
  const outRef = compRefMap?.value[props.out?.id as string]

  if (!inRef || !outRef) {
    return
  }

  // @ts-expect-error 组件动态赋值
  outRef[props.out?.content] = inRef[props.in?.content]
}

defineExpose({
  assign,
})
</script>

<template/>
