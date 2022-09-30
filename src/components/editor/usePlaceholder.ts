import { Ref } from 'vue'
import { ComponentData, Space } from '@/components/page-editor/types'
import { GRID_HEIGHT, GRID_WIDTH, MIN_HEIGHT_UNIT, MovingType } from '@/libs/consts'

export default (
  draggingComponent: Ref<ComponentData | undefined>,
  isMoving: Ref<boolean>,
  curType: Ref<MovingType | undefined>,
) => {
  const placeholderSpace = computed<Space>(() => {
    const dc = draggingComponent.value
    const space: Space = {
      left: -9999,
      top: -9999,
      height: 0,
      width: 0,
    }

    if (!isMoving.value || !dc) {
      return space
    }

    for (const key of (['left', 'top', 'width', 'height'] as (keyof Space)[])) {
      let gridValue
      if (key === 'left' || key === 'width') {
        gridValue = GRID_WIDTH
      } else {
        gridValue = GRID_HEIGHT
      }

      let val
      if (key === 'width' || key === 'height') {
        // 无 UI 组件的尺寸为 0，占位元素，显示为 2 个单位的长宽
        val = dc[key] || (MIN_HEIGHT_UNIT * gridValue)
      } else {
        val = dc[key]
      }

      space[key] = Math.round(val / gridValue) * gridValue
    }

    if (curType.value === MovingType.NEW && (space.left < 0 || space.top < 0)) {
      space.width = 0
      space.height = 0
    } else {
      // 不是新添加组件时，禁止拖到编辑器外面
      space.left = Math.max(space.left, 0)
      space.top = Math.max(space.top, 0)
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

  return {
    placeholderSpace,
    placeholderSpaceStyles,
  }
}
