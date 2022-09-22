<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BTester',
})
</script>

<script setup lang="ts">
import { ComponentPublicInstance, onMounted, reactive, ref } from 'vue'
import { ComponentData } from '@/components/page-editor/types'
import {
  MIN_WIDTH_UNIT, MIN_HEIGHT_UNIT, GRID_WIDTH, GRID_HEIGHT,
} from '@/libs/consts'
import { KeyValue } from '@/types/common'
import { componentMap } from '@/components/b-components'
import _set from 'lodash/set'
import { PageData } from '@/components/editor/types'
import BLayout from '@/components/layout/BLayout.vue'
import BChangeMode from '@/components/editor/BChangeMode.vue'

const props = defineProps<{
  pageData: PageData
}>()

const compRefMap = ref<KeyValue<ComponentPublicInstance | undefined>>({})
// 页面组件信息，避免修改传进来的数据，简单深拷贝一下
const components = JSON.parse(JSON.stringify(props.pageData.components || []))
// 所有组件的 ID 到 组件配置的映射
const componentSettingMap = ref<KeyValue<KeyValue>>({})
// 事件配置
const events = JSON.parse(JSON.stringify(props.pageData.events || []))
/**
 * 组件 ID 到组件事件的回调函数数组
 *
 * 结构如下
 * {
 *   'id1' => {
 *     'click' => [Function, Function],
 *   },
 *   'id2' => {
 *     'change' => [Function],
 *   },
 * }
 */
const callbackMap: KeyValue<KeyValue<Function[] | undefined> | undefined> = {}

/**
 * 组件 ID 到组件事件的回调函数，该函数中会遍历执行回调函数数组中的函数
 *
 * 结构如下
 *
 * {
 *   'id1' => {
 *     'click' => Function,
 *   },
 *   'id2' => {
 *     'input' => Function,
 *     'change' => Function,
 *   },
 * }
 */
const vOnMap = reactive<KeyValue<KeyValue<Function> | undefined>>({})

const updateCompRefList = (el: ComponentPublicInstance | null, component: ComponentData) => {
  if (el === null) {
    delete compRefMap.value[component.id]
  } else {
    compRefMap.value[component.id] = el
  }
}

for (const component of components) {
  componentSettingMap.value[component.id] = component.setting
}

const initEventFlow = () => {
  for (const e of events) {
    const { trigger, action } = e
    if (!trigger.id || !trigger.event || !action.id || !action.action) {
      continue
    }

    const triggerRef = compRefMap.value[trigger.id]
    if (triggerRef === undefined) {
      console.warn(`触发组件, ID: ${trigger.id}, 找不到组件`)
      continue
    }
    const triggerCD = componentMap[triggerRef.$.type.name || '__not_exists__']
    if (triggerCD === undefined) {
      console.warn(`触发组件, ID: ${trigger.id}, componentName: ${triggerRef.$.type.name}, 找不到组件定义`)
      continue
    }
    if (triggerCD.eventSetting?.trigger?.[trigger.event] === undefined) {
      console.warn(`触发组件, ID: ${trigger.id}, componentName: ${triggerRef.$.type.name}, 可能没有事件: ${trigger.event}`)
    }

    const actionRef = compRefMap.value[action.id]
    if (actionRef === undefined) {
      console.warn(`动作组件, ID: ${trigger.id}, 找不到组件`)
      continue
    }
    const actionCD = componentMap[actionRef.$.type.name || '__not_exists__']
    if (actionCD === undefined) {
      console.warn(`动作组件, ID: ${trigger.id}, componentName: ${actionRef.$.type.name}, 找不到组件定义`)
      continue
    }
    const actionSetting = actionCD.eventSetting?.action?.[action.action]
    if (actionSetting === undefined) {
      console.warn(`动作组件, ID: ${trigger.id}, componentName: ${actionRef.$.type.name}, 找不到组件动作: ${action.action}`)
      continue
    }

    let callback: Function
    if (actionSetting.method) {
      const c = actionRef.$.exposed?.[actionSetting.method as string]
      if (typeof c === 'function') {
        callback = () => c()
      } else {
        console.warn(`动作组件, ID: ${trigger.id}, componentName: ${actionRef.$.type.name}, 找不到组件方法: ${actionSetting.method}`)
        continue
      }
    } else {
      callback = () => {
        componentSettingMap.value[action.id][actionSetting.prop as string] = actionSetting.value
      }
    }

    const callbacks = callbackMap[trigger.id]?.[trigger.event] || []
    callbacks.push(callback)
    _set(callbackMap, `${trigger.id}.${trigger.event}`, callbacks)
    _set(vOnMap, `${trigger.id}.${trigger.event}`, () => {
      for (const callback of callbacks) {
        callback()
      }
    })
  }
}

onMounted(() => {
  initEventFlow()
})
</script>

<template>
  <BLayout>
    <template #header>
      <BChangeMode/>
    </template>

    <template #content>
      <div class="content-1">
        <div class="content-2">
          <div
            v-for="component in components"
            :key="component.id"
            class="component"
            :style="{
              width: `${component.width || (MIN_WIDTH_UNIT * GRID_WIDTH)}px`,
              height: `${component.height || (MIN_HEIGHT_UNIT * GRID_HEIGHT)}px`,
              left: `${component.left}px`,
              top: `${component.top}px`,
            }"
          >
            <component
              :is="component.componentName"
              :ref="(el: ComponentPublicInstance | null) => updateCompRefList(el, component)"
              v-bind="componentSettingMap[component.id]"
              v-on="vOnMap[component.id] || {}"
            />
          </div>
        </div>
      </div>
    </template>
  </BLayout>
</template>

<style scoped lang="less">
.component {
  box-sizing: border-box;
  position: absolute;
  padding: 4px;
  border-radius: 2px;
}
</style>
