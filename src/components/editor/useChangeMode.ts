import { ref } from 'vue'
import { EditorMode } from '@/libs/consts'

export const currentMode = ref<EditorMode>(EditorMode.PAGE)

export const isMode = (mode: EditorMode) => {
  return currentMode.value === mode
}
