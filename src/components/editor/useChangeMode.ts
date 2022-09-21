import { EditorMode } from '@/components/page-editor/types'
import { readonly, ref } from 'vue'
import { EDITOR_MODE_PAGE } from '@/libs/consts'

const currentMode = ref<EditorMode>(EDITOR_MODE_PAGE)

export default () => {
  const changeMode = (mode: EditorMode) => {
    currentMode.value = mode
  }

  return {
    currentMode: readonly(currentMode),
    changeMode,
  }
}
