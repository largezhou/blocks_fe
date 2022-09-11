<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BComponent',
})
</script>

<script setup lang="ts">
import BSvgIcon from '@/components/svg-icon/BSvgIcon.vue'
import { ComponentData } from '@/components/page-editor/types'
import { componentHasUi } from '@/components/b-components'
import { GRID_WIDTH, GRID_HEIGHT } from '@/libs/consts'
import { computed } from 'vue'

const props = defineProps<{
  data: ComponentData
  selectedId?: string
}>()
const hasUI = componentHasUi(props.data)
const spaceStyles = computed(() => {
  const d = props.data as ComponentData

  let w, h
  if (hasUI) {
    w = d.width || 1
    h = d.height || 1
  } else {
    w = h = 1
  }

  return {
    width: `${w * GRID_WIDTH}px`,
    height: `${h * GRID_HEIGHT}px`,
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
      :is="data.name"
      v-if="hasUI"
      v-bind="data?.setting"
    />
    <BSvgIcon
      v-else
      :name="`component-${data?.icon || '_default'}`"
    />
    <div class="b-resizer"/>
  </div>
</template>

<style lang="less">
@component-padding: 4px;

.b-component {
  box-sizing: border-box;
  position: absolute;
  padding: @component-padding;
  border-radius: 2px;

  @selected-border: 1px;
  @selected-padding: @component-padding - @selected-border;

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
