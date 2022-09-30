<script lang="ts">
export default defineComponent({
  name: 'BEditor',
})
</script>

<script setup lang="ts">
import BPageEditor from '@/components/page-editor/BPageEditor.vue'
import { EditorMode } from '@/libs/consts'
import BTester from '@/components/editor/BTester.vue'
import BEventEditor from '@/components/event-editor/BEventEditor.vue'
import { isMode } from '@/components/editor/useChangeMode'
</script>

<template>
  <KeepAlive>
    <BPageEditor v-if="isMode(EditorMode.PAGE)"/>
  </KeepAlive>
  <KeepAlive>
    <BEventEditor v-if="isMode(EditorMode.EVENT)"/>
  </KeepAlive>
  <BTester v-if="isMode(EditorMode.TESTER)"/>
</template>
