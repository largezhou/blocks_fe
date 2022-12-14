<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BEventItem',
})
</script>

<script setup lang="ts">
import { EventData } from '@/components/event-editor/types'
import { selectFilterOption } from '@/libs/utils'
import _map from 'lodash/map'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons-vue'
import { getComponentDefById } from '@/components/editor/useComponents'
import { componentSelectOptions } from '@/components/editor/useComponentSelectOptions'

const props = defineProps<{
  event: EventData
}>()

defineEmits<{
  (e: 'remove'): void
  (e: 'add'): void
}>()

const data = reactive<EventData>(props.event)

const componentTriggerOptions = computed(() => {
  const setting = getComponentDefById(data.trigger.id)?.eventSetting?.trigger || {}
  return _map(setting, (s, key) => ({ label: s.showName, value: key }))
})

const componentActionOptions = computed(() => {
  const cd = getComponentDefById(data.action.id)
  if (!cd) {
    return []
  }
  return _map(cd.eventSetting?.action || {}, (s, key) => ({ label: s.showName, value: key }))
})

watch(() => data.trigger.id, () => {
  data.trigger.event = ''
})

watch(() => data.action.id, () => {
  data.action.action = ''
})
</script>

<template>
  <ACard class="event-item">
    <AForm layout="inline">
      <AFormItem label="当">
        <ASelect
          v-model:value="data.trigger.id"
          show-search
          :filter-option="selectFilterOption"
          :options="componentSelectOptions"
        />
      </AFormItem>
      <AFormItem label="发生">
        <ASelect
          v-model:value="data.trigger.event"
          show-search
          :filter-option="selectFilterOption"
          :options="componentTriggerOptions"
        />
      </AFormItem>
      <AFormItem label="通知">
        <ASelect
          v-model:value="data.action.id"
          show-search
          :filter-option="selectFilterOption"
          :options="componentSelectOptions"
        />
      </AFormItem>
      <AFormItem label="执行">
        <ASelect
          v-model:value="data.action.action"
          show-search
          :filter-option="selectFilterOption"
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
