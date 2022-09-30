<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SDataSource',
})
</script>

<script setup lang="ts">
import { SelectOptions } from '@/types/common'
import { selectFilterOption } from '@/libs/utils'
import { SettingAssign } from '@/components/event-editor/types'
import { getComponentDefById } from '@/components/editor/useComponents'
import { componentSelectOptions } from '@/components/editor/useComponentSelectOptions'
import { AssignValueFlow } from '@/libs/consts'
import _forEach from 'lodash/forEach'

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
  value?: DataSource
  /**
   * 该组件作为数据源还是赋值目标
   */
  flow: AssignValueFlow.IN | AssignValueFlow.OUT
}>()
const emits = defineEmits<{
  (e: 'update:value', val: DataSource): void
}>()

const dataSelectOptions = computed<SelectOptions>(() => {
  if (!props.value?.id) {
    return []
  }
  const cd = getComponentDefById(props.value.id)
  const options: SelectOptions = []
  _forEach(cd?.eventSetting?.assign, (s: SettingAssign, val: string) => {
    if (s.flow === props.flow || s.flow === AssignValueFlow.BOTH) {
      options.push({ label: s.showName, value: val })
    }
  })

  return options
})

const onUpdateValue = (key: keyof DataSource, val: any) => {
  const v = props.value || {}
  v[key] = val
  emits('update:value', v)
}

watch(() => props.value?.id, () => {
  onUpdateValue('content', undefined)
})
</script>

<template>
  <AFormItem label="组件">
    <ASelect
      :value="value?.id"
      show-search
      :filter-option="selectFilterOption"
      :options="componentSelectOptions"
      @update:value="(val: string) => onUpdateValue('id', val)"
    />
  </AFormItem>
  <AFormItem label="数据">
    <ASelect
      :value="value?.content"
      :options="dataSelectOptions"
      @update:value="(val: any) => onUpdateValue('content', val)"
    />
  </AFormItem>
</template>
