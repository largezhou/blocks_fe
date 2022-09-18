import { HtmlNodeModel, PointAnchor } from '@logicflow/core'
import { Field } from '@/components/event-editor/types'

const ANCHOR_TYPE_LEFT = 'left'
const ANCHOR_TYPE_RIGHT = 'right'

type CustomPointAnchor = PointAnchor & {
  type: typeof ANCHOR_TYPE_LEFT | typeof ANCHOR_TYPE_RIGHT
}

export class ComponentNodeModel extends HtmlNodeModel {
  /**
   * 给model自定义添加字段方法
   */
  addField(item: Field) {
    this.properties.fields.push(item)
    this.setAttributes()
    // 为了保持节点顶部位置不变，在节点变化后，对节点进行一个位移,位移距离为添加高度的一半。
    this.move(0, 24 / 2)
  }

  getOutlineStyle() {
    const style = super.getOutlineStyle()
    style.stroke = 'none'
    style.hover = {
      ...style.hover,
      stroke: 'none',
    }
    return style
  }

  // 如果不用修改锚地形状，可以重写颜色相关样式
  getAnchorStyle(anchorInfo: CustomPointAnchor) {
    const style = super.getAnchorStyle(undefined)
    if (anchorInfo.type === ANCHOR_TYPE_LEFT) {
      style.fill = 'red'
    } else {
      style.fill = 'green'
    }
    return style
  }

  setAttributes() {
    this.width = 200
    const {
      properties: { fields },
    } = this
    this.height = 60 + fields.length * 24
    this.sourceRules.push({
      message: '只允许从右边的锚点连出',
      validate: (sourceNode, targetNode, sourceAnchor) => {
        return sourceAnchor?.type === 'right'
      },
    })
    this.targetRules.push({
      message: '只允许连接左边的锚点',
      validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
        return targetAnchor?.type === 'left'
      },
    })
  }

  getDefaultAnchor(): CustomPointAnchor[] {
    const {
      id,
      x,
      y,
      width,
      height,
      properties: { fields },
    } = this
    const anchors: CustomPointAnchor[] = []
    fields.forEach((field: Field, index: number) => {
      anchors.push({
        x: x - width / 2 + 10,
        y: y - height / 2 + 60 + index * 24,
        id: `${id}_${index}_left`,
        type: ANCHOR_TYPE_LEFT,
      })
      anchors.push({
        x: x + width / 2 - 10,
        y: y - height / 2 + 60 + index * 24,
        id: `${id}_${index}_right`,
        type: ANCHOR_TYPE_RIGHT,
      })
    })
    return anchors
  }
}
