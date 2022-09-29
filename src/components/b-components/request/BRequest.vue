<script lang="ts">
import { defineComponent } from 'vue'
import { settings, eventSetting } from './settings'

export default defineComponent({
  name: 'BRequest',
  showName: '接口',
  minWidthUnit: 0,
  minHeightUnit: 0,
  icon: 'request',
  category: '接口',
  settings,
  eventSetting,
})
</script>

<script setup lang="ts">
import { ref } from 'vue'
import _get from 'lodash/get'
import { message, Modal } from 'ant-design-vue'

const props = withDefaults(
  defineProps<{
    messageKey?: string
    codeKey?: string
    url?: string
    successCode?: any
    showMessage?: boolean
    method?: 'POST' | 'GET' | 'DELETE' | 'PATCH' | 'PUT'
    confirm?: boolean,
  }>(),
  {
    messageKey: 'message',
    codeKey: 'code',
    url: undefined,
    successCode: 0,
    showMessage: true,
    method: 'POST',
    confirm: false,
  },
)

const emits = defineEmits<{
  (e: 'start'): void
  (e: 'success'): void
  (e: 'fail'): void
  (e: 'done'): void
}>()

const request = ref<any>()
const response = ref<any>()

const sleep = () => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      Math.random() > 0.5
        ? resolve({ code: 0, message: '请求成功', data: request.value })
        : Math.random() > 0.5 ? reject(new Error('请求失败了')) : resolve({ code: 40000, message: '余额不足' })
    }, 1000)
  })
}

const confirm = () => {
  return new Promise((resolve) => {
    Modal.confirm({
      title: '发起请求？',
      onOk() {
        resolve(true)
      },
      onCancel() {
        resolve(false)
      },
    })
  })
}

const startRequest = async () => {
  if (props.confirm && !await confirm()) {
    emits('done')
    return
  }

  emits('start')
  console.log(`发起请求，method: ${props.method}，url: ${props.url}`)
  try {
    response.value = await sleep()
    console.log(response.value)
    const code = _get(response.value, props.codeKey)
    const msgContent = _get(response.value, props.messageKey)
    if (code == props.successCode) {
      emits('success')
      props.showMessage && message.success(msgContent || '请求成功')
    } else {
      emits('fail')
      props.showMessage && message.error(msgContent || '请求失败')
    }
  } catch (e) {
    emits('fail')
    props.showMessage && message.error(String(e) || '请求失败')
  } finally {
    emits('done')
  }
}

defineExpose({
  startRequest,
  request,
  response,
})
</script>

<template/>
