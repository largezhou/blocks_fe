<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BChangeMode',
})
</script>

<script setup lang="ts">
import { EditorMode } from '@/libs/consts'
import useChangeMode from '@/components/editor/useChangeMode'

const { currentMode, changeMode } = useChangeMode()
</script>

<template>
  <ARadioGroup
    :value="currentMode"
    button-style="solid"
    @update:value="changeMode"
  >
    <ARadioButton :value="EditorMode.PAGE">页面</ARadioButton>
    <ARadioButton :value="EditorMode.EVENT">事件</ARadioButton>
    <ARadioButton :value="EditorMode.TESTER">预览</ARadioButton>
  </ARadioGroup>
</template>
