<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BComponent',
})
</script>

<script setup lang="ts">
import BSvgIcon from '@/components/svg-icon/BSvgIcon.vue'
import { ComponentData } from '@/components/page-editor/types'
import { componentHasUi, componentMap } from '@/components/b-components'
import { GRID_WIDTH, GRID_HEIGHT } from '@/libs/consts'
import { computed } from 'vue'
import BComponentNotExists from '@/components/b-components/component-not-exists/BComponentNotExists.vue'

const props = defineProps<{
  data: ComponentData
  selectedId?: string
}>()

const emits = defineEmits<{
  (e: 'resize', event: MouseEvent, data: ComponentData): void
}>()

const cd = componentMap[props.data.name]

// 当组件不存在时，使用 BComponentNotExists 展示，没有任何功能
const componentName = cd?.name || BComponentNotExists.name
const hasUI = cd ? componentHasUi(props.data) : true

const spaceStyles = computed(() => {
  const d = props.data as ComponentData

  return {
    width: `${d.width || GRID_WIDTH}px`,
    height: `${d.height || GRID_HEIGHT}px`,
    left: `${d.left}px`,
    top: `${d.top}px`,
  }
})
const isSelected = computed(() => props.selectedId === props.data.id)
</script>

<template>
  <div
    class="b-component"
    :class="{ 'b-selected': isSelected }"
    :style="spaceStyles"
  >
    <component
      :is="componentName"
      v-if="hasUI"
      v-bind="data?.setting"
    />
    <BSvgIcon
      v-else
      :name="`component-${cd?.icon || '_default'}`"
    />
    <div class="b-resizer" @mousedown.stop="emits('resize', $event, data)"/>
  </div>
</template>

<style lang="less">
@component-padding: 4px;
@selected-border: 1px;
@selected-padding: @component-padding - @selected-border;

.b-component {
  user-select: none;
  box-sizing: border-box;
  position: absolute;
  padding: @component-padding;
  border-radius: 2px;

  &.b-selected {
    border: @selected-border #bae7ff solid;
    padding: @selected-padding;

    .b-resizer {
      display: block;
    }
  }

  .b-resizer {
    display: none;
    width: 12px;
    height: 12px;
    position: absolute;
    bottom: -3px;
    right: -3px;
    border-bottom-right-radius: 2px;
    cursor: se-resize;
    border: 3px #69c0ff solid;
    border-left: none;
    border-top: none;
  }

  .b-svg-icon {
    height: 100%;
    width: 100%;
  }
}
</style>
