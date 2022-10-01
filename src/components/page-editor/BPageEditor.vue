<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BPageEditor',
})
</script>

<script setup lang="ts">
import { groupComponents, componentMap } from '@/components/b-components'
import { componentHasUi } from '@/libs/utils'
import BSvgIcon from '@/components/svg-icon/BSvgIcon.vue'
import { useEventListener } from '@/hooks/common'
import { Position, ComponentData, Space } from '@/components/page-editor/types'
import {
  LAZY_DELTA,
  EDITOR_LEFT, EDITOR_TOP,
  DRAGGING_MOUSE_OFFSET,
  GRID_WIDTH, GRID_HEIGHT,
  MIN_WIDTH_UNIT, MIN_HEIGHT_UNIT,
  MovingType,
} from '@/libs/consts'
import BEditComponent from '@/components/page-editor/BEditComponent.vue'
import BSettings from '@/components/page-editor/BSettings.vue'
import { KeyValue } from '@/types/common'
import BLayout from '@/components/layout/BLayout.vue'
import BChangeMode from '@/components/editor/BChangeMode.vue'
import {
  componentDataList,
  getComponentById, removeComponent, addComponent,
  definitionToData,
} from '@/components/editor/useComponents'
import usePlaceholder from '@/components/editor/usePlaceholder'
import { provideIsEditMode } from '@/components/editor/useEditMode'

// 正在拖动的组件
const draggingComponent = ref<ComponentData>()
// 鼠标移动时的类型，move-拖动组件，new-新增组件，resize-缩放组件
let curType = ref<MovingType>()
// 鼠标按下时，鼠标的位置和组件的大小
const startSpace: Space = {
  left: 0,
  top: 0,
  height: 0,
  width: 0,
}
// 拖动元素时，鼠标相对于组件的坐标
const mouseOffset: Position = {
  left: 0,
  top: 0,
}
// 组件是否正在移动
const isMoving = ref(false)
// 当前选中组件 ID
const selectedId = ref<string>()
// 当前选中的组件
const selectedComponent = computed(() => getComponentById(selectedId.value as string))

const { placeholderSpace, placeholderSpaceStyles } = usePlaceholder(draggingComponent, isMoving, curType)

provideIsEditMode()

// 开始拖拽组建，移动，新增或缩放
const startMove = (e: MouseEvent, component: ComponentData, type: MovingType) => {
  if (e.buttons !== 1) {
    return
  }

  if (type === MovingType.RESIZE && !componentHasUi(component)) {
    return
  }

  curType.value = type
  draggingComponent.value = component

  startSpace.left = e.clientX
  startSpace.top = e.clientY
  startSpace.width = component.width
  startSpace.height = component.height

  if (curType.value === MovingType.NEW || curType.value === MovingType.MOVE) {
    // 新增组件时，鼠标偏移默认为 DRAGGING_MOUSE_OFFSET，否则需要计算
    mouseOffset.left = type === MovingType.NEW ? DRAGGING_MOUSE_OFFSET : (e.clientX - draggingComponent.value.left - EDITOR_LEFT)
    mouseOffset.top = type === MovingType.NEW ? DRAGGING_MOUSE_OFFSET : (e.clientY - draggingComponent.value.top - EDITOR_TOP)
  }
}
const onStartNew = (e: MouseEvent, component: ComponentData) => {
  startMove(e, component, MovingType.NEW)
}
const onStartMove = (e: MouseEvent, component: ComponentData) => {
  selectedId.value = component.id
  startMove(e, component, MovingType.MOVE)
}
const onStartResize = (e: MouseEvent, component: ComponentData) => {
  startMove(e, component, MovingType.RESIZE)
}

// 停止鼠标拖动
const stop = () => {
  isMoving.value = false
  draggingComponent.value = undefined
  curType.value = undefined
}
useEventListener(document, 'mousemove', (_e: Event) => {
  const dc = draggingComponent.value

  if (!dc) {
    return
  }

  const e = _e as MouseEvent

  const deltaX = e.clientX - startSpace.left
  const deltaY = e.clientY - startSpace.top

  if (
    (curType.value === MovingType.NEW || curType.value === MovingType.MOVE)
    && (Math.abs(deltaX) > LAZY_DELTA || Math.abs(deltaY) > LAZY_DELTA)
  ) {
    isMoving.value = true
    dc.left = deltaX + startSpace.left - mouseOffset.left - EDITOR_LEFT
    dc.top = deltaY + startSpace.top - mouseOffset.top - EDITOR_TOP

    // 移动组件时，不能拖到编辑器外面
    if (curType.value === MovingType.MOVE) {
      dc.left = Math.max(dc.left, 0)
      dc.top = Math.max(dc.top, 0)
    }
  }

  if (curType.value === MovingType.RESIZE) {
    const cd = componentMap[dc.componentName]
    isMoving.value = true
    dc.width = Math.max((cd?.minWidthUnit || MIN_WIDTH_UNIT) * GRID_WIDTH, deltaX + startSpace.width)
    dc.height = Math.max((cd?.minHeightUnit || MIN_HEIGHT_UNIT) * GRID_HEIGHT, deltaY + startSpace.height)
  }
})
useEventListener(document, 'mouseup', (_e: Event) => {
  const c = draggingComponent.value
  const ps = placeholderSpace.value

  if (!isMoving.value || !c || ps.left < 0 || ps.top < 0) {
    stop()
    return
  }

  const hasUI = componentHasUi(c)
  // 使用 占位元素的 大小和位置
  c.left = ps.left
  c.top = ps.top
  c.width = hasUI ? ps.width : 0
  c.height = hasUI ? ps.height : 0

  if (curType.value === MovingType.NEW) {
    addComponent({ ...c })
  }
  selectedId.value = c.id
  stop()
})

const onRemove = (i: number) => {
  removeComponent(i)
  selectedId.value = undefined
}
// 更新组件数据中的 setting 值
const onUpdateSettingValues = (setting: KeyValue) => {
  if (selectedId.value && selectedComponent.value) {
    selectedComponent.value.setting = setting
  }
}

const onUpdateShowName = (val: string) => {
  if (selectedId.value && selectedComponent.value) {
    selectedComponent.value.showName = val
  }
}

const onSave = () => {
  console.log(JSON.stringify(componentDataList, null, 2))
}
</script>

<template>
  <BLayout>
    <template #sider>
      <template v-for="(components, category) in groupComponents" :key="category">
        <ADivider class="category">{{ category }}</ADivider>
        <div
          v-for="component in components"
          :key="component.name"
          class="component-item"
          @mousedown.stop="onStartNew($event, definitionToData(component))"
        >
          <BSvgIcon :name="`component-${component.icon ?? '_default'}`"/>
          <span class="component-name">{{ component.showName }}</span>
        </div>
      </template>
    </template>

    <template #header>
      <BChangeMode/>
    </template>

    <template #header-right-actions>
      <AButton
        class="header-btn"
        type="primary"
        @click="onSave"
      >
        保存
      </AButton>
    </template>

    <template #content>
      <div class="content-1">
        <div class="content-2">
          <div class="placeholder" :style="placeholderSpaceStyles"/>
          <BEditComponent
            v-if="curType === MovingType.NEW && isMoving && draggingComponent"
            :data="draggingComponent"
          />
          <template v-for="(componentData, index) in componentDataList" :key="componentData.id">
            <BEditComponent
              :data="componentData"
              :selected-id="selectedId"
              @start-move="onStartMove"
              @resize="onStartResize"
              @remove="() => onRemove(index)"
            />
          </template>
        </div>
      </div>
      <BSettings
        :component-data="selectedComponent"
        @update:setting-values="onUpdateSettingValues"
        @update-show-name="onUpdateShowName"
      />
    </template>
  </BLayout>
</template>

<style scoped lang="less">
@import '@/styles/var.less';

.placeholder {
  background: #d7f7ff;
  border-radius: 2px;
  position: absolute;
}

.category {
  color: @sider-color;
  border-color: @sider-color;
}
</style>
