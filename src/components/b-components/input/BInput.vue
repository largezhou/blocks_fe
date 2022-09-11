<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BInput',
  showName: '输入框',
  minWidthUnit: 3,
  minHeightUnit: 2,
  icon: 'input',
  category: '输入',
})
</script>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string,
    extra?: string,
    placeholder?: string,
    allowClear?: boolean,
    disabled?: boolean,
    value?: any,
  }>(),
  {
    label: '输入框',
    extra: '',
    placeholder: '请输入...',
    allowClear: true,
    disabled: false,
    value: null,
  },
)
</script>

<template>
  <div class="b-input ant-form ant-form-vertical">
    <AFormItem :label="label" :extra="extra">
      <AInput
        :value="value"
        :allow-clear="allowClear"
        :placeholder="placeholder"
        :disabled="disabled"
        :lebel="label"
        :extra="extra"
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
