import BaseNodeModel from '@logicflow/core/types/model/node/BaseNodeModel'
import { ModelType } from '@logicflow/core/types/constant/constant'
import { PointAnchor } from '@logicflow/core'
import { Field } from '@/components/event-editor/types'

declare module '@logicflow/core' {
  declare class HtmlNodeModel extends BaseNodeModel {
    modelType: ModelType
    properties: {
      tableName: string
      fields: Field[]
    } & Record<string, any>

    getDefaultAnchor(): PointAnchor[];
  }

  export { HtmlNodeModel }
}
