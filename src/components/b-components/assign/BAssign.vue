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
import { ComponentPublicInstance, Ref } from 'vue'
import { KeyValue } from '@/types/common'
import { getComponentDefById } from '@/components/editor/useComponents'
import { AssignValueType } from '@/libs/consts'

interface DataSource {
  /**
   * 组件 ID
   */
  id?: string
  /**
   * 组件中用来接收某个值的字段
   */
  content?: any
}

const props = defineProps<{
  in?: DataSource
  out?: DataSource
}>()

const compRefMap = inject<Ref<KeyValue<ComponentPublicInstance | undefined>>>('compRefMap')

const assign = () => {
  const inId = props.in?.id as string
  const outId = props.out?.id as string
  const inContent = props.in?.content as string
  const outContent = props.out?.content as string

  const inRef = compRefMap?.value[inId]
  const outRef = compRefMap?.value[outId]
  if (!inRef || !outRef) {
    return
  }

  const inCd = getComponentDefById(inId)
  const outCd = getComponentDefById(outId)
  if (!inCd || !outCd) {
    return
  }

  const inSetting = inCd.eventSetting?.assign?.[inContent]
  const outSetting = outCd.eventSetting?.assign?.[outContent]
  if (!inSetting || !outSetting) {
    return
  }

  const val = outSetting.type === AssignValueType.DATA
    // @ts-expect-error 组件动态赋值
    ? outRef[outContent]
    : outRef.$.props[props.out?.content]

  if (inSetting.type === AssignValueType.DATA) {
    // @ts-expect-error 组件动态赋值
    inRef[inContent] = val
  } else {
    inRef.$.emit(`update:${props.in?.content}`, val)
  }
}

defineExpose({
  assign,
})
</script>

<template/>
