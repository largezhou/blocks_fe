<script lang="ts">
export default defineComponent({
  name: 'BTester',
})
</script>

<script setup lang="ts">
import { ComponentPublicInstance, Ref } from 'vue'
import { ComponentData } from '@/components/page-editor/types'
import {
  MIN_WIDTH_UNIT, MIN_HEIGHT_UNIT, GRID_WIDTH, GRID_HEIGHT,
} from '@/libs/consts'
import { KeyValue } from '@/types/common'
import { componentMap } from '@/components/b-components'
import _set from 'lodash/set'
import BLayout from '@/components/layout/BLayout.vue'
import BChangeMode from '@/components/editor/BChangeMode.vue'
import { EventData, SettingAction } from '@/components/event-editor/types'
import { commonActions } from '@/components/event-editor'
import { pageData } from '@/components/editor/usePageData'

const compRefMap = ref<KeyValue<ComponentPublicInstance | undefined>>({})
// 页面组件信息，避免修改传进来的数据，简单深拷贝一下
const components: ComponentData[] = JSON.parse(JSON.stringify(pageData.components || []))
// 所有组件的 ID 到 组件配置的映射
const componentSettingMap = ref<KeyValue<KeyValue>>({})
// 事件配置
const events: EventData[] = JSON.parse(JSON.stringify(pageData.events || []))
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

provide<Ref<KeyValue<ComponentPublicInstance | undefined>>>('compRefMap', compRefMap)

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
    let actionSetting = actionCD.eventSetting?.action?.[action.action]
    if (actionSetting === undefined && actionCD.settings?.controlHidden !== undefined) {
      actionSetting = commonActions.controlHidden[action.action]
    }

    if (actionSetting === undefined) {
      console.warn(`动作组件, ID: ${trigger.id}, componentName: ${actionRef.$.type.name}, 找不到组件动作: ${action.action}`)
      continue
    }

    let callback: Function
    const as = actionSetting as SettingAction
    if (as.method) {
      const c = actionRef.$.exposed?.[as.method as string]
      if (typeof c === 'function') {
        callback = () => c()
      } else {
        console.warn(`动作组件, ID: ${trigger.id}, componentName: ${actionRef.$.type.name}, 找不到组件方法: ${as.method}`)
        continue
      }
    } else {
      callback = () => {
        componentSettingMap.value[action.id][as.prop as string] = as.value
      }
    }

    const callbacks = callbackMap[trigger.id]?.[trigger.event] || []
    callbacks.push(callback)
    _set(callbackMap, `${trigger.id}.${trigger.event}`, callbacks)
    _set(vOnMap, `${trigger.id}.${trigger.event}`, () => {
      for (const callback of callbacks) {
        // 异步执行所有事件触发时需要执行的操作
        window.setTimeout(callback, 0)
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
              v-show="!componentSettingMap[component.id].controlHidden"
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
