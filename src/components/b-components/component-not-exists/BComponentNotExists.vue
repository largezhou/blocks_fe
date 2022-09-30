<script lang="ts">
import BSvgIcon from '@/components/svg-icon/BSvgIcon.vue'
import { MIN_HEIGHT_UNIT, MIN_WIDTH_UNIT } from '@/libs/consts'

export default defineComponent({
  name: 'BComponentNotExists',
  components: {
    BSvgIcon,
  },
  showName: '组件不存在',
  minHeightUnit: MIN_HEIGHT_UNIT,
  minWidthUnit: MIN_WIDTH_UNIT,
})
</script>

<template>
  <BSvgIcon name="not-exists"/>
</template>
