import { ref, watch } from 'vue'
import { SelectOptions } from '@/types/common'
import _debounce from 'lodash/debounce'
import { componentDataList } from '@/components/editor/useComponents'

export const componentSelectOptions = ref<SelectOptions>([])

// 修改组件的展示名时，会更新所有事件配置中的下拉选择，会有点卡，这里做个防抖，避免输入时卡
watch(componentDataList, _debounce(() => {
  componentSelectOptions.value = componentDataList.map((data) => ({ label: data.showName, value: data.id }))
}, 100), {
  immediate: true,
})
