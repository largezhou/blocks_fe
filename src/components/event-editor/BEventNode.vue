<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BEventNode',
})
</script>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  msg: string,
  initCount: number,
}>()
const count = ref(props.initCount)
</script>

<template>
  <h1 @click="count++">{{ msg + ':' + count }}</h1>
</template>

<style scoped lang="less">
h1 {
  height: 100%;
  width: 100%;
}
</style>
