<script lang="ts">
import { defineComponent } from 'vue'
import { settings, eventSetting } from './settings'

export default defineComponent({
  name: 'BModal',
  showName: '弹框',
  minWidthUnit: 10,
  minHeightUnit: 6,
  icon: 'modal',
  category: '弹框',
  isContainer: true,
  settings,
  eventSetting,
})
</script>

<script setup lang="ts">
import { injectIsEditMode } from '@/components/editor/useEditMode'
import { ComponentData } from '@/components/page-editor/types'

withDefaults(
  defineProps<{
    title?: string
    hidden?: boolean
    keyboard?: boolean
    maskClosable?: boolean
  }>(),
  {
    title: '提示',
    hidden: true,
    keyboard: true,
    maskClosable: true,
  },
)
const emits = defineEmits<{
  (e: 'update:hidden', val: boolean): void
}>()

const isEditMode = injectIsEditMode()
const component = inject<ComponentData | undefined>('component', undefined)

const onUpdateVisible = (val: boolean) => {
  emits('update:hidden', !val)
}
</script>

<template>
  <div v-if="isEditMode" class="ant-modal-content">
    <div v-show="title" class="ant-modal-header">
      <div class="ant-modal-title">{{ title }}</div>
    </div>
    <div class="ant-modal-body">
      <slot/>
    </div>
  </div>

  <AModal
    v-else
    :title="title"
    :footer="null"
    :visible="!hidden"
    wrap-class-name="b-modal"
    :width="component?.width"
    :height="component?.height"
    :keyboard="keyboard"
    :mask-closable="maskClosable"
    @update:visible="onUpdateVisible"
  >
    <slot/>
  </AModal>
</template>

<style scoped lang="less">
.ant-modal-body {
  padding: 0;
  position: relative;
}

.ant-modal-content {
  height: 100%;
  box-shadow: none;
  background-color: #f0f2f5;
  border: 1px solid #d9d9d9;
}
</style>

<style lang="less">
.b-modal {
  .ant-modal-body {
    padding: 0;
  }

  .ant-modal-content {
    height: 100%;
  }

  .ant-modal {
    padding: 0;
  }
}
</style>
