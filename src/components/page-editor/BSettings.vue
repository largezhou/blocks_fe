<script setup lang="ts">
import { ComponentData } from '@/components/page-editor/types'
import _assign from 'lodash/assign'
import _keys from 'lodash/keys'
import { getDefaults } from '@/components/s-components/setting-component-defaults'
import { computed, watch, reactive } from 'vue'
import { componentMap } from '@/components/b-components'
import { ComponentPropsSetting } from '@/components/b-components/types'
import { KeyValue } from '@/types/common'

const props = defineProps<{
  componentData: ComponentData | null
}>()
const emits = defineEmits<{
  (e: 'update:settingValues', setting: KeyValue): void
  (e: 'updateShowName', val: string): void
}>()
const dc = computed(() => {
  return componentMap[props.componentData?.componentName || -1]
})
const settings = computed(() => {
  return dc.value?.settings || []
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

  for (const setting of settings.value) {
    formData[setting.propsName] = props.componentData?.setting[setting.propsName] || setting.value
  }
}, {
  immediate: true,
})
const getValueName = (setting: ComponentPropsSetting) => {
  return setting.valueName || 'value'
}
const getUpdateValueEventName = (setting: ComponentPropsSetting) => {
  return `update:${getValueName(setting)}`
}
const onUpdateValue = (propName: string, val: unknown) => {
  formData[propName] = val
}
const vBind = (setting: ComponentPropsSetting) => {
  return _assign(getDefaults(setting.componentName), setting.setting || {})
}
</script>

<template>
  <ACard :title="title" class="b-settings">
    <AForm layout="vertical">
      <AFormItem label="展示名称">
        <AInput
          :value="props.componentData?.showName"
          @update:value="(val: string) => $emit('updateShowName', val)"
        />
      </AFormItem>
      <AFormItem
        v-for="(s, i) in settings"
        :key="i"
        :label="s.label"
      >
        <component
          :is="s.componentName"
          v-bind="vBind(s)"
          :[getValueName(s)]="formData[s.propsName]"
          @[getUpdateValueEventName(s)]="(val: unknown) => onUpdateValue(s.propsName, val)"
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
