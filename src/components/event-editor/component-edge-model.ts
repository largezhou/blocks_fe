import { BezierEdgeModel } from '@logicflow/core'

export class ComponentEdgeModel extends BezierEdgeModel {
  getAnimation() {
    const animation = super.getAnimation()
    animation.stroke = '#1890ff'
    animation.strokeDasharray = '15,120'
    return animation
  }
}
