import { ComponentPropsSettings } from '@/components/b-components/types'

const settings: ComponentPropsSettings = {
  label: {
    label: '标签文本',
    componentName: 'AInput',
    value: '输入框',
  },
  name: {
    label: '数据字段名',
    componentName: 'AInput',
    value: 'input',
  },
  value: {
    label: '默认值',
    componentName: 'AInput',
    value: null,
  },
  extra: {
    label: '下方提示信息',
    componentName: 'AInput',
    value: '',
  },
  placeholder: {
    label: '提示信息',
    componentName: 'AInput',
    value: '请输入...',
  },
  allowClear: {
    label: '是否可清除',
    componentName: 'ACheckbox',
    valueName: 'checked',
    value: true,
  },
  disabled: {
    label: '禁用',
    componentName: 'ACheckbox',
    valueName: 'checked',
    value: false,
  },
}

export default settings
