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
    value: null,
    extra: '',
    placeholder: '请输入...',
    allowClear: true,
    disabled: false,
  },
)

const emits = defineEmits<{
  (e: 'change'): void
}>()

const inputValue = ref(props.value)
watch(inputValue, () => {
  emits('change')
})

const clear = () => {
  if (inputValue.value === undefined || inputValue.value === null || inputValue.value === '') {
    return
  }
  inputValue.value = undefined
}

defineExpose({
  clear,
  inputValue,
})
</script>

<template>
  <div class="b-input ant-form ant-form-vertical">
    <AFormItem :label="label" :extra="extra">
      <AInput
        v-model:value="inputValue"
        :allow-clear="allowClear"
        :placeholder="placeholder"
        :disabled="disabled"
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
