<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BEditor',
})
</script>

<script setup lang="ts">
import mockPageData from '@/components/editor/mock-page-data'
import { computed, provide, reactive, readonly } from 'vue'
import BPageEditor from '@/components/page-editor/BPageEditor.vue'
import { ComponentData } from '@/components/page-editor/types'
import { EDITOR_MODE_PAGE, EDITOR_MODE_EVENT, EDITOR_MODE_TESTER } from '@/libs/consts'
import BTester from '@/components/editor/BTester.vue'
import BEventEditor from '@/components/event-editor/BEventEditor.vue'
import useChangeMode from '@/components/editor/useChangeMode'
import { getComponentSelectOptions } from '@/libs/utils'

const pageData = reactive(mockPageData)
const componentDataList = pageData.components
const componentSelectOptions = computed(() => getComponentSelectOptions(componentDataList))

const { currentMode } = useChangeMode()

provide('componentSelectOptions', componentSelectOptions)
provide('componentDataList', readonly(componentDataList))

const onAddComponent = (data: ComponentData) => {
  componentDataList.push(data)
}
const onRemoveComponent = (index: number) => {
  componentDataList.splice(index, 1)
}

const onRemoveEvent = (index: number) => {
  pageData.events.splice(index, 1)
}

const onAddEvent = (index: number) => {
  pageData.events.splice(index + 1, 0, {
    trigger: {
      id: '',
      event: '',
    },
    action: {
      id: '',
      action: '',
    },
  })
}
</script>

<template>
  <KeepAlive>
    <BPageEditor
      v-if="currentMode === EDITOR_MODE_PAGE"
      :component-data-list="componentDataList"
      @add="onAddComponent"
      @remove="onRemoveComponent"
    />
  </KeepAlive>
  <KeepAlive>
    <BEventEditor
      v-if="currentMode === EDITOR_MODE_EVENT"
      :page-data="pageData"
      @remove="onRemoveEvent"
      @add="onAddEvent"
    />
  </KeepAlive>
  <BTester
    v-if="currentMode === EDITOR_MODE_TESTER"
    :page-data="pageData"
  />
</template>
