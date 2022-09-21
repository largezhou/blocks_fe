import { ComponentData } from '@/components/page-editor/types'
import { EventData } from '@/components/event-editor/types'

// 单个页面的所有数据
export interface PageData {
  components: ComponentData[],
  events: EventData[],
}
