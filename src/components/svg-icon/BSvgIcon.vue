<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BSvgIcon',
})
</script>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string,
}>()
const symbolId = computed(() => `#icon-${props.name}`)
</script>

<template>
  <svg aria-hidden="true" class="b-svg-icon">
    <use :href="symbolId"/>
  </svg>
</template>

<style lang="less">
.b-svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
