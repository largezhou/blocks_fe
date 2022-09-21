<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BEditor',
})
</script>

<script setup lang="ts">
import mockPageData from '@/components/editor/mock-page-data'
import { ref } from 'vue'
import BPageEditor from '@/components/page-editor/BPageEditor.vue'
import { ComponentData } from '@/components/page-editor/types'
import { EDITOR_MODE_PAGE, EDITOR_MODE_EVENT, EDITOR_MODE_TESTER } from '@/libs/consts'
import BTester from '@/components/editor/BTester.vue'
import BEventEditor from '@/components/event-editor/BEventEditor.vue'
import useChangeMode from '@/components/editor/useChangeMode'

const pageData = ref(mockPageData)
const componentDataList = pageData.value.components

const { currentMode } = useChangeMode()

const onAddComponent = (data: ComponentData) => {
  componentDataList.push(data)
}
const onRemoveComponent = (index: number) => {
  componentDataList.splice(index, 1)
}
</script>

<template>
  <BPageEditor
    v-show="currentMode === EDITOR_MODE_PAGE"
    :component-data-list="componentDataList"
    @add="onAddComponent"
    @remove="onRemoveComponent"
  />
  <BEventEditor
    v-show="currentMode === EDITOR_MODE_EVENT"
    :page="pageData"
  />
  <BTester
    v-if="currentMode === EDITOR_MODE_TESTER"
    :page-data="pageData"
  />
</template>
