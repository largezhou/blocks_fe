<script lang="ts">
import { defineComponent } from 'vue'
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
  <ATooltip>
    <template #title>组件不存在</template>
    <BSvgIcon name="not-exists"/>
  </ATooltip>
</template>
