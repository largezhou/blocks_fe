export const safeJsonParse = (text?: string | null, defaultVal?: any) => {
  try {
    return JSON.parse(text as string)
  } catch (e) {
    console.warn(e)
    return defaultVal
  }
}

export const selectFilterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
