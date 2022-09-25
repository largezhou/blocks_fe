export type KeyValue<T = any> = Record<string, T>

export interface SelectOption<V = any> {
  label: string,
  value: V,
}

export type SelectOptions<V = any> = SelectOption<V>[]
