<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BChangeMode',
})
</script>

<script setup lang="ts">
import {
  EDITOR_MODE_PAGE, EDITOR_MODE_EVENT, EDITOR_MODE_TESTER,
} from '@/libs/consts'
import useChangeMode from '@/components/editor/useChangeMode'

const { currentMode, changeMode } = useChangeMode()
</script>

<template>
  <ARadioGroup
    :value="currentMode"
    button-style="solid"
    @update:value="changeMode"
  >
    <ARadioButton :value="EDITOR_MODE_PAGE">页面</ARadioButton>
    <ARadioButton :value="EDITOR_MODE_EVENT">事件</ARadioButton>
    <ARadioButton :value="EDITOR_MODE_TESTER">预览</ARadioButton>
  </ARadioGroup>
</template>
