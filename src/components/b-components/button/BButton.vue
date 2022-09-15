<script lang="ts">
import { defineComponent } from 'vue'
import settings from './settings'

export default defineComponent({
  name: 'BButton',
  showName: '按钮',
  minWidthUnit: 2,
  minHeightUnit: 2,
  icon: 'button',
  category: '通用',
  settings,
})
</script>

<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string,
    type?: 'primary' | 'text' | 'default',
    danger?: boolean,
    disabled?: boolean,
  }>(),
  {
    text: '按钮',
    type: 'primary',
    danger: false,
    disabled: false,
  },
)

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const onClick = (e: MouseEvent) => {
  emit('click', e)
}
</script>

<template>
  <AButton
    class="b-button"
    :type="type"
    :danger="danger"
    :disabled="disabled"
    @click="onClick"
  >
    {{ text }}
  </AButton>
</template>

<style lang="less">
.b-button.ant-btn {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
</style>
