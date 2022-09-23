<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BEventItem',
})
</script>

<script setup lang="ts">
import { PageData } from '@/components/editor/types'
import { computed, reactive } from 'vue'
import { EventData } from '@/components/event-editor/types'
import { getComponentById } from '@/libs/utils'
import { componentMap } from '@/components/b-components'
import _map from 'lodash/map'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons-vue'
import { commonActions } from '@/components/event-editor'

const props = defineProps<{
  pageData: PageData
  event: EventData
}>()

defineEmits<{
  (e: 'remove'): void
  (e: 'add'): void
}>()

const data = reactive<EventData>(props.event)

const componentSelectOptions = computed(() => {
  return props.pageData.components.map((data) => ({ label: data.showName, value: data.id }))
})

const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

const getComponentDefByComponentId = (id?: string) => {
  if (!id) {
    return null
  }
  const dc = getComponentById(props.pageData.components, id)
  if (!dc) {
    return null
  }
  return componentMap[dc.componentName]
}

const componentTriggerOptions = computed(() => {
  const setting = getComponentDefByComponentId(data.trigger.id)?.eventSetting?.trigger || {}
  return _map(setting, (s, key) => ({ label: s.showName, value: key }))
})

const componentActionOptions = computed(() => {
  const cd = getComponentDefByComponentId(data.action.id)
  if (!cd) {
    return []
  }
  const setting = cd.eventSetting?.action || {}
  let options = _map(setting, (s, key) => ({ label: s.showName, value: key }))

  if (cd.settings?.controlHidden !== undefined) {
    options = options.concat(_map(commonActions.controlHidden, (s, key) => ({ label: s.showName, value: key })))
  }

  return options
})
</script>

<template>
  <ACard class="event-item">
    <AForm layout="inline">
      <AFormItem label="当组件">
        <ASelect
          v-model:value="data.trigger.id"
          show-search
          :filter-option="filterOption"
          :options="componentSelectOptions"
        />
      </AFormItem>
      <AFormItem label="发生">
        <ASelect
          v-model:value="data.trigger.event"
          show-search
          :filter-option="filterOption"
          :options="componentTriggerOptions"
        />
      </AFormItem>
      <AFormItem label="通知">
        <ASelect
          v-model:value="data.action.id"
          show-search
          :filter-option="filterOption"
          :options="componentSelectOptions"
        />
      </AFormItem>
      <AFormItem label="执行">
        <ASelect
          v-model:value="data.action.action"
          show-search
          :filter-option="filterOption"
          :options="componentActionOptions"
        />
      </AFormItem>
      <AFormItem>
        <ASpace>
          <AButton
            type="primary"
            danger
            shape="circle"
            size="small"
            @click="$emit('remove')"
          >
            <template #icon>
              <MinusOutlined/>
            </template>
          </AButton>
          <AButton
            type="primary"
            shape="circle"
            size="small"
            @click="$emit('add')"
          >
            <template #icon>
              <PlusOutlined/>
            </template>
          </AButton>
        </ASpace>
      </AFormItem>
    </AForm>
  </ACard>
</template>

<style scoped lang="less">
.event-item {
  flex-basis: 49%;
  min-width: 600px;
  margin-bottom: 10px;

  &:nth-child(odd) {
    margin-right: 1%;
  }
}

::v-deep(.ant-select) {
  width: 180px;
}
</style>
