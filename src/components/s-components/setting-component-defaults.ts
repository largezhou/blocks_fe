/**
 * 一些简单的组件，可以直接设定一些默认的 props 即可，否则得重新封装
 */

import { Defaults } from '@/components/s-components/types'
import { KeyValue } from '@/types/common'

const defaults: KeyValue<Defaults | undefined> = {
  ASelect: {},
  ACheckbox: {},
  AInput: {
    allowClear: true,
  },
}

export const getDefaults = (name: string) => {
  return { ...defaults[name] } || {}
}
