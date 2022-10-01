<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BTester',
})
</script>

<script setup lang="ts">
import { ComponentPublicInstance, Ref } from 'vue'
import { ComponentData } from '@/components/page-editor/types'
import { KeyValue } from '@/types/common'
import { componentMap } from '@/components/b-components'
import _set from 'lodash/set'
import BLayout from '@/components/layout/BLayout.vue'
import BChangeMode from '@/components/editor/BChangeMode.vue'
import { EventData } from '@/components/event-editor/types'
import { pageData } from '@/components/editor/usePageData'
import _keys from 'lodash/keys'
import { getComponentDefById } from '@/components/editor/useComponents'
import BComponent from '@/components/component/BComponent.vue'

const compRefMap = ref<KeyValue<ComponentPublicInstance | undefined>>({})
// 页面组件信息，避免修改传进来的数据，简单深拷贝一下
const components: ComponentData[] = JSON.parse(JSON.stringify(pageData.components || []))
// 所有组件的 ID 到 组件配置的映射
const componentPropsMap = ref<KeyValue<KeyValue>>({})
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
/**
 * 各组件中各个 props 的更新函数，比如：update:value
 */
const vOnUpdateMap = reactive<KeyValue<KeyValue<Function>>>({})

provide<Ref<KeyValue<ComponentPublicInstance | undefined>>>('compRefMap', compRefMap)
provide<KeyValue<KeyValue<Function> | undefined>>('vOnMap', vOnMap)
provide<KeyValue<KeyValue<Function>>>('vOnUpdateMap', vOnUpdateMap)
provide<Ref<KeyValue<KeyValue>>>('componentPropsMap', componentPropsMap)

const updateCompRefList = (el: ComponentPublicInstance | null, component: ComponentData) => {
  if (el === null) {
    delete compRefMap.value[component.id]
  } else {
    compRefMap.value[component.id] = el
  }
}

for (const component of components) {
  componentPropsMap.value[component.id] = component.setting
  const cd = getComponentDefById(component.id)
  _keys(cd?.props || {}).forEach((key: string) => {
    _set(vOnUpdateMap, `${component.id}.update:${key}`, (val: any) => componentPropsMap.value[component.id][key] = val)
  })
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
      console.warn(`动作组件, ID: ${action.id}, 找不到组件`)
      continue
    }
    const actionCD = componentMap[actionRef.$.type.name || '__not_exists__']
    if (actionCD === undefined) {
      console.warn(`动作组件, ID: ${action.id}, componentName: ${actionRef.$.type.name}, 找不到组件定义`)
      continue
    }
    const actionSetting = actionCD.eventSetting?.action?.[action.action]
    if (actionSetting === undefined) {
      console.warn(`动作组件, ID: ${action.id}, componentName: ${actionRef.$.type.name}, 找不到组件动作: ${action.action}`)
      continue
    }

    let callback: Function
    if (actionSetting.method) {
      const c = actionRef.$.exposed?.[actionSetting.method as string]
      if (typeof c === 'function') {
        callback = () => c()
      } else {
        console.warn(`动作组件, ID: ${action.id}, componentName: ${actionRef.$.type.name}, 找不到组件方法: ${actionSetting.method}`)
        continue
      }
    } else {
      callback = () => {
        componentPropsMap.value[action.id][actionSetting.prop as string] = actionSetting.value
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
          <BComponent
            v-for="component in components"
            :key="component.id"
            :component="component"
            @mount="(el: ComponentPublicInstance | null) => updateCompRefList(el, component)"
          />
        </div>
      </div>
    </template>
  </BLayout>
</template>

<style scoped lang="less">
</style>
