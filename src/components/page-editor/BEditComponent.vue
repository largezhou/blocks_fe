<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BEditComponent',
})
</script>

<script setup lang="ts">
import BSvgIcon from '@/components/svg-icon/BSvgIcon.vue'
import { ComponentData } from '@/components/page-editor/types'
import { componentMap } from '@/components/b-components'
import { componentHasUi } from '@/libs/utils'
import { GRID_WIDTH, GRID_HEIGHT, MIN_HEIGHT_UNIT, MIN_WIDTH_UNIT } from '@/libs/consts'
import BComponentNotExists from '@/components/b-components/component-not-exists/BComponentNotExists.vue'
import { CloseCircleFilled } from '@ant-design/icons-vue'

const props = defineProps<{
  data: ComponentData
  selectedId?: string
}>()

const emits = defineEmits<{
  (e: 'resize', event: MouseEvent, data: ComponentData): void
  (e: 'remove', data: ComponentData): void
  (e: 'startMove', event: MouseEvent, data: ComponentData): void
}>()

const cd = componentMap[props.data.componentName]

// 当组件不存在时，使用 BComponentNotExists 展示，没有任何功能
const componentName = cd?.name || BComponentNotExists.name
const hasUI = cd ? componentHasUi(props.data) : true
const isHidden = computed<boolean>(() => {
  return !!props.data.setting.hidden
})

const spaceStyles = computed(() => {
  const d = props.data as ComponentData

  return {
    width: `${d.width || (MIN_WIDTH_UNIT * GRID_WIDTH)}px`,
    height: `${d.height || (MIN_HEIGHT_UNIT * GRID_HEIGHT)}px`,
    left: `${d.left}px`,
    top: `${d.top}px`,
  }
})
const isSelected = computed(() => props.selectedId === props.data.id)
const onStartMove = (e: MouseEvent) => {
  const shouldIgnore = e.composedPath().some((el) => {
    return (el as HTMLElement).classList?.contains('remove')
  })

  if (shouldIgnore) {
    return
  }

  emits('startMove', e, props.data)
}
</script>

<template>
  <div
    class="component"
    :class="{
      selected: isSelected,
      hidden: isHidden,
      'is-container': cd?.isContainer,
    }"
    :data-id="data.id"
    :style="spaceStyles"
    @mousedown.stop="onStartMove"
  >
    <component
      :is="componentName"
      v-if="hasUI"
      v-bind="data?.setting"
    />
    <BSvgIcon v-else :name="`component-${cd?.icon || '_default'}`"/>
    <div
      v-if="hasUI"
      class="resizer"
      @mousedown.stop="emits('resize', $event, data)"
    />
    <CloseCircleFilled
      class="remove"
      @click="emits('remove', data)"
    />
  </div>
</template>

<style lang="less">
@component-padding: 4px;
@selected-border: 1px;
@selected-padding: @component-padding - @selected-border;

.component {
  user-select: none;
  position: absolute;
  padding: @component-padding;
  border-radius: 2px;

  &:hover {
    .remove {
      display: block;
    }
  }

  &.selected {
    border: @selected-border #bae7ff solid;
    padding: @selected-padding;
    z-index: 9999;

    .resizer {
      display: block;
    }
  }

  &.hidden {
    opacity: 0.3;
  }

  .resizer {
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

  .remove {
    cursor: pointer;
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    color: #bfbfbf;
    font-size: 14px;

    &:hover {
      color: #8c8c8c;
    }
  }
}
</style>
