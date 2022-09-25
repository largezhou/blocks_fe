import { readonly, ref } from 'vue'
import { EditorMode } from '@/libs/consts'

const currentMode = ref<EditorMode>(EditorMode.PAGE)

export default () => {
  const changeMode = (mode: EditorMode) => {
    currentMode.value = mode
  }

  return {
    currentMode: readonly(currentMode),
    changeMode,
  }
}
