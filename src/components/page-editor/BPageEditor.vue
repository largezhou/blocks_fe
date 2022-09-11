<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BPageEditor',
})
</script>

<script setup lang="ts">
import { componentHasUi, groupComponents } from '@/components/b-components'
import BSvgIcon from '@/components/svg-icon/BSvgIcon.vue'
import { ref, computed } from 'vue'
import { useEventListener } from '@/hooks/common'
import { Position, ComponentData, Space } from '@/components/page-editor/types'
import {
  LAZY_DELTA,
  EDITOR_LEFT, EDITOR_TOP,
  DRAGGING_MOUSE_OFFSET,
  GRID_WIDTH, GRID_HEIGHT,
} from '@/libs/consts'
import BComponent from '@/components/page-editor/BComponent.vue'
import { definitionToData } from '@/libs/utils'

// 正在拖动的组件
const draggingComponent = ref<ComponentData | null>(null)
// 鼠标按下时的位置
const startPosition: Position = {
  left: 0,
  top: 0,
}
// 组件是否正在移动
const isMoving = ref(false)
// 拖动时，鼠标相对于组件左上角的位置
let mouseOffsetPosition: Position = {
  left: DRAGGING_MOUSE_OFFSET,
  top: DRAGGING_MOUSE_OFFSET,
}
const componentDataList = ref<ComponentData[]>([])
const uiComponentDataList = computed(() => {
  return componentDataList.value.filter(componentHasUi)
})

// 开始拖拽一个新组建
const onSelectNew = (e: MouseEvent, component: ComponentData) => {
  if (e.buttons !== 1) {
    return
  }

  draggingComponent.value = component

  startPosition.left = e.clientX
  startPosition.top = e.clientY
}
// 停止鼠标拖动
const stop = () => {
  isMoving.value = false
  draggingComponent.value = null
}
useEventListener(document, 'mousemove', (_e: Event) => {
  if (!draggingComponent.value) {
    return
  }

  const e = _e as MouseEvent

  const deltaX = e.clientX - startPosition.left
  const deltaY = e.clientY - startPosition.top

  if (Math.abs(deltaX) > LAZY_DELTA || Math.abs(deltaY) > LAZY_DELTA) {
    isMoving.value = true
    draggingComponent.value.left = deltaX + startPosition.left - mouseOffsetPosition.left - EDITOR_LEFT
    draggingComponent.value.top = deltaY + startPosition.top - mouseOffsetPosition.top - EDITOR_TOP
  }
})
// 添加新的组件到编辑器
const onAddNewComponent = (_e: Event) => {
  const c = draggingComponent.value
  const ps = placeholderSpace.value

  if (
    !isMoving.value || c === null
    || ps.left < 0 || ps.top < 0
  ) {
    stop()
    return
  }

  componentDataList.value.push({
    ...c,
    left: ps.left,
    top: ps.top,
    width: ps.width / GRID_WIDTH,
    height: ps.height / GRID_HEIGHT,
  })
  stop()
}
useEventListener(document, 'mouseup', onAddNewComponent)

const placeholderSpace = computed<Space>(() => {
  const dc = draggingComponent.value
  const space: Space = {
    left: -9999,
    top: -9999,
    height: 0,
    width: 0,
  }

  if (!isMoving.value || dc === null || !componentHasUi(dc)) {
    return space
  }
  for (const key of ['left', 'top', 'width', 'height'] as (keyof Space)[]) {
    let gridValue
    if (key === 'left' || key === 'width') {
      gridValue = GRID_WIDTH
    } else {
      gridValue = GRID_HEIGHT
    }

    let val = dc[key]
    if (key === 'width' || key === 'height') {
      val = val * gridValue
    }

    space[key] = Math.round(val / gridValue) * gridValue
  }

  if (space.left < 0 || space.top < 0) {
    space.width = 0
    space.height = 0
  }

  return space
})
const placeholderSpaceStyles = computed(() => {
  const s = placeholderSpace.value
  return {
    width: `${s.width}px`,
    height: `${s.height}px`,
    left: `${s.left}px`,
    top: `${s.top}px`,
  }
})
</script>

<template>
  <ALayout class="layout" has-sider>
    <ALayoutSider class="sider components-panel">
      <template v-for="(components, category) in groupComponents" :key="category">
        <ADivider class="category">{{ category }}</ADivider>
        <div
          v-for="component in components"
          :key="component.name"
          class="component-item"
          @mousedown.stop="onSelectNew($event, definitionToData(component))"
        >
          <BSvgIcon :name="`component-${component.icon ?? '_default'}`"/>
          <span class="component-name">{{ component.showName || component.name }}</span>
        </div>
      </template>
    </ALayoutSider>
    <ALayout class="layout-main">
      <ALayoutHeader class="header"/>
      <ALayoutContent class="content">
        <div>
          <div>
            <div class="b-placeholder" :style="placeholderSpaceStyles"/>
            <BComponent
              v-if="isMoving && draggingComponent !== null"
              :data="draggingComponent"
            />
            <template v-for="componentData in uiComponentDataList" :key="componentData.id">
              <BComponent :data="componentData"/>
            </template>
          </div>
        </div>
      </ALayoutContent>
      <ALayoutFooter class="footer">BLOCKS</ALayoutFooter>
    </ALayout>
  </ALayout>
</template>

<style scoped lang="less">
@import '@/styles/layout.less';

@sider-color: #b3b9bf;

.components-panel {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;

  ::v-deep(.ant-layout-sider-children) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    width: 100%;
    align-items: center;
  }

  .component-item {
    flex-basis: 50%;
    display: inline-block;
    width: 70px;
    height: 70px;
    margin: 4px 0;
    text-align: center;
    color: @sider-color;
    user-select: none;

    &:hover {
      color: #fff;
    }

    svg {
      font-size: 25px;
    }

    .component-name {
      display: block;
    }
  }

  .category {
    color: @sider-color;
    border-color: @sider-color;
  }
}

.b-placeholder {
  background: #e6f7ff;
  border-radius: 2px;
  position: absolute;
}
</style>
