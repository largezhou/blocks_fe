<script setup lang="ts">
import { ComponentData } from '@/components/page-editor/types'
import _assign from 'lodash/assign'
import _keys from 'lodash/keys'
import _forEach from 'lodash/forEach'
import { getDefaults } from '@/components/s-components/setting-component-defaults'
import { componentMap } from '@/components/b-components'
import { ComponentPropsSetting } from '@/components/b-components/types'
import { KeyValue } from '@/types/common'
import _has from 'lodash/has'

const props = defineProps<{
  componentData?: ComponentData
}>()
const emits = defineEmits<{
  (e: 'update:settingValues', setting: KeyValue): void
  (e: 'updateShowName', val: string): void
}>()
const dc = computed(() => {
  return componentMap[props.componentData?.componentName || -1]
})
const settings = computed(() => {
  return dc.value?.settings || {}
})
const title = computed(() => {
  return `${dc.value?.showName || '选中组件开始'}配置`
})
const formData = reactive<KeyValue>({})
watch(formData, () => {
  emits('update:settingValues', { ...formData })
})
watch(() => props.componentData?.id, () => {
  _keys(formData).forEach((key: string) => delete formData[key])
  _forEach(settings.value, (setting, propsName) => {
    formData[propsName] = _has(props.componentData, `setting.${propsName}`)
      ? props.componentData?.setting[propsName]
      : setting.value
  })
}, {
  immediate: true,
})
const getValueName = (setting: ComponentPropsSetting) => {
  return setting.valueName || 'value'
}
const getUpdateValueEventName = (setting: ComponentPropsSetting) => {
  return `update:${getValueName(setting)}`
}
const onUpdateValue = (propName: string | number, val: any) => {
  formData[propName] = val
}
const vBind = (setting: ComponentPropsSetting) => {
  return _assign(getDefaults(setting.componentName), setting.setting || {})
}
</script>

<template>
  <ACard :title="title" class="b-settings">
    <AForm layout="vertical">
      <AFormItem v-if="componentData" label="展示名称" extra="用于编辑时的查看和区分">
        <AInput
          :value="props.componentData?.showName"
          @update:value="(val: string) => $emit('updateShowName', val)"
        />
      </AFormItem>
      <AFormItem
        v-for="(setting, propsName) in settings"
        :key="propsName"
        :label="setting.label"
        :extra="setting.extra"
      >
        <component
          :is="setting.componentName"
          v-bind="vBind(setting)"
          :[getValueName(setting)]="formData[propsName]"
          @[getUpdateValueEventName(setting)]="(val: any) => onUpdateValue(propsName, val)"
        />
      </AFormItem>
    </AForm>
  </ACard>
</template>

<style scoped lang="less">
.b-settings {
  width: 300px;
  background-color: white;
}
</style>
