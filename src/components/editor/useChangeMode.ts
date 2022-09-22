import { EditorMode } from '@/components/page-editor/types'
import { readonly, ref } from 'vue'
import { EDITOR_MODE_EVENT } from '@/libs/consts'

const currentMode = ref<EditorMode>(EDITOR_MODE_EVENT)

export default () => {
  const changeMode = (mode: EditorMode) => {
    currentMode.value = mode
  }

  return {
    currentMode: readonly(currentMode),
    changeMode,
  }
}
