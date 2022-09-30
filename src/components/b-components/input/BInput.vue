<script lang="ts">
import { defineComponent } from 'vue'
import { settings, eventSetting } from './settings'

export default defineComponent({
  name: 'BInput',
  showName: '输入框',
  minWidthUnit: 6,
  minHeightUnit: 4,
  icon: 'input',
  category: '输入',
  settings,
  eventSetting,
})
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string,
    name?: string,
    value?: any,
    extra?: string,
    placeholder?: string,
    allowClear?: boolean,
    disabled?: boolean,
  }>(),
  {
    label: '输入框',
    name: 'input',
    value: undefined,
    extra: '',
    placeholder: '请输入...',
    allowClear: true,
    disabled: false,
  },
)

const emits = defineEmits<{
  (e: 'change'): void
  (e: 'update:value', val: any): void
}>()

const onUpdateValue = (val: any) => {
  emits('update:value', val)
}

const clear = () => {
  if (props.value === undefined || props.value === null || props.value === '') {
    return
  }
  emits('update:value', undefined)
}

defineExpose({
  clear,
})
</script>

<template>
  <div class="b-input ant-form ant-form-vertical">
    <AFormItem :label="label" :extra="extra">
      <AInput
        :value="value"
        :allow-clear="allowClear"
        :placeholder="placeholder"
        :disabled="disabled"
        @update:value="onUpdateValue"
      />
    </AFormItem>
  </div>
</template>

<style lang="less">
.b-input {
  .ant-form-item {
    margin-bottom: 0;
  }

  .ant-form-item-extra {
    word-break: break-all;
  }
}
</style>
