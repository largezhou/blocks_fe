<script lang="ts">
export default defineComponent({
  name: 'BEventEditor',
})
</script>

<script setup lang="ts">
import BLayout from '@/components/layout/BLayout.vue'
import BChangeMode from '@/components/editor/BChangeMode.vue'
import BSvgIcon from '@/components/svg-icon/BSvgIcon.vue'
import { componentMap } from '@/components/b-components'
import BEventItem from '@/components/event-editor/BEventItem.vue'
import { pageData } from '@/components/editor/usePageData'

const events = pageData.events
const removeEvent = (index: number) => {
  events.splice(index, 1)
}
const addEvent = (index: number) => {
  events.splice(index + 1, 0, {
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

const getKey = (index: number) => {
  return Symbol(index)
}

const onSave = () => {
  console.log(JSON.stringify(pageData.events, null, 2))
}
</script>

<template>
  <BLayout>
    <template #header>
      <BChangeMode/>
    </template>

    <template #header-right-actions>
      <AButton
        class="header-btn"
        type="primary"
        @click="onSave"
      >
        保存
      </AButton>
    </template>

    <template #sider>
      <div
        v-for="data in pageData.components"
        :key="data.id"
        class="component-item"
      >
        <BSvgIcon :name="`component-${componentMap[data.componentName]?.icon || '_default'}`"/>
        <span class="component-name">{{ data.showName }}</span>
      </div>
    </template>

    <template #content>
      <div class="content-1">
        <div class="content-2">
          <div class="event-items">
            <BEventItem
              v-for="(event, index) in pageData.events"
              :key="getKey(index)"
              :event="event"
              @remove="removeEvent(index)"
              @add="addEvent(index)"
            />
          </div>
          <div style="text-align: center; margin-top: 10px;">
            <AButton type="primary" @click="addEvent(pageData.events.length - 1)">添加事件</AButton>
          </div>
        </div>
      </div>
    </template>
  </BLayout>
</template>

<style scoped lang="less">
.event-items {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
}
</style>
