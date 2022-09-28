<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SDataSource',
})
</script>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { SelectOptions } from '@/types/common'
import { selectFilterOption } from '@/libs/utils'
import _map from 'lodash/map'
import { SettingValue } from '@/components/event-editor/types'
import { getComponentDefById } from '@/components/editor/useComponents'
import { componentSelectOptions } from '@/components/editor/useComponentSelectOptions'

interface DataSource {
  id?: string
  content?: any
}

const props = defineProps<{
  value?: DataSource
}>()
const emits = defineEmits<{
  (e: 'update:value', val: DataSource): void
}>()

const dataSelectOptions = computed<SelectOptions>(() => {
  if (!props.value?.id) {
    return []
  }
  const cd = getComponentDefById(props.value.id)
  return _map(cd?.eventSetting?.value, (s: SettingValue, val: string) => {
    return { label: s.showName, value: val }
  })
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
