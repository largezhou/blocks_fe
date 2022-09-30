<script lang="ts">
export default defineComponent({
  name: 'BChangeMode',
})
</script>

<script setup lang="ts">
import { EditorMode } from '@/libs/consts'
import { currentMode } from '@/components/editor/useChangeMode'
</script>

<template>
  <ARadioGroup
    v-model:value="currentMode"
    button-style="solid"
  >
    <ARadioButton :value="EditorMode.PAGE">页面</ARadioButton>
    <ARadioButton :value="EditorMode.EVENT">事件</ARadioButton>
    <ARadioButton :value="EditorMode.TESTER">预览</ARadioButton>
  </ARadioGroup>
</template>
