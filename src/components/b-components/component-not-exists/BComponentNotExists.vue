<script lang="ts">
import { defineComponent } from 'vue'
import BSvgIcon from '@/components/svg-icon/BSvgIcon.vue'

export default defineComponent({
  name: 'BComponentNotExists',
  components: {
    BSvgIcon,
  },
  showName: '组件不存在',
  minHeightUnit: 1,
  minWidthUnit: 1,
})
</script>

<template>
  <ATooltip>
    <template #title>组件不存在</template>
    <BSvgIcon name="not-exists"/>
  </ATooltip>
</template>
