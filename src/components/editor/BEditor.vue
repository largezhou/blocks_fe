<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BEditor',
})
</script>

<script setup lang="ts">
import mockPageData from '@/components/editor/mock-page-data'
import { provide, reactive, readonly, Ref, ref, watch } from 'vue'
import BPageEditor from '@/components/page-editor/BPageEditor.vue'
import { ComponentData } from '@/components/page-editor/types'
import { EditorMode } from '@/libs/consts'
import BTester from '@/components/editor/BTester.vue'
import BEventEditor from '@/components/event-editor/BEventEditor.vue'
import useChangeMode from '@/components/editor/useChangeMode'
import { getComponentSelectOptions } from '@/libs/utils'
import _debounce from 'lodash/debounce'
import { SelectOptions, VueReadonly } from '@/types/common'

const pageData = reactive(mockPageData)
const componentDataList = pageData.components
const componentSelectOptions = ref<SelectOptions>([])

const { currentMode } = useChangeMode()

provide<Ref<SelectOptions>>('componentSelectOptions', componentSelectOptions)
provide<VueReadonly<ComponentData[]>>('componentDataList', readonly(componentDataList))

// 修改组件的展示名时，会更新所有事件配置中的下拉选择，会有点卡，这里做个防抖，避免输入时卡
watch(componentDataList, _debounce(() => {
  componentSelectOptions.value = getComponentSelectOptions(componentDataList)
}, 100), {
  immediate: true,
})

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
      v-if="currentMode === EditorMode.PAGE"
      :component-data-list="componentDataList"
      @add="onAddComponent"
      @remove="onRemoveComponent"
    />
  </KeepAlive>
  <KeepAlive>
    <BEventEditor
      v-if="currentMode === EditorMode.EVENT"
      :page-data="pageData"
      @remove="onRemoveEvent"
      @add="onAddEvent"
    />
  </KeepAlive>
  <BTester
    v-if="currentMode === EditorMode.TESTER"
    :page-data="pageData"
  />
</template>
