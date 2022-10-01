<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BComponent',
})
</script>

<script setup lang="ts">
import { ComponentData } from '@/components/page-editor/types'
import { MIN_WIDTH_UNIT, MIN_HEIGHT_UNIT, GRID_WIDTH, GRID_HEIGHT } from '@/libs/consts'
import { KeyValue } from '@/types/common'
import { ComponentPublicInstance, Ref } from 'vue'

const props = defineProps<{
  component: ComponentData
}>()
const emits = defineEmits<{
  (e: 'mount', val: ComponentPublicInstance | null): void
}>()

const vOnMap = inject('vOnMap') as KeyValue<KeyValue<Function> | undefined>
const vOnUpdateMap = inject('vOnUpdateMap') as KeyValue<KeyValue<Function>>
const componentPropsMap = inject('componentPropsMap') as Ref<KeyValue<KeyValue>>

provide<ComponentData>('component', props.component)

/**
 * 合并普通的事件和 update:xxx 事件
 *
 * @param id
 */
const getVOn = (id: string) => {
  return {
    ...(vOnMap[id] || {}),
    ...(vOnUpdateMap[id] || {}),
  }
}
</script>

<template>
  <div
    class="component"
    :style="{
      width: `${component.width || (MIN_WIDTH_UNIT * GRID_WIDTH)}px`,
      height: `${component.height || (MIN_HEIGHT_UNIT * GRID_HEIGHT)}px`,
      left: `${component.left}px`,
      top: `${component.top}px`,
    }"
  >
    <component
      :is="component.componentName"
      :ref="(val: ComponentPublicInstance | null) => emits('mount', val)"
      v-bind="componentPropsMap[component.id]"
      v-on="getVOn(component.id)"
    />
  </div>
</template>

<style scoped lang="less">
.component {
  box-sizing: border-box;
  position: absolute;
  padding: 4px;
  border-radius: 2px;
}
</style>
