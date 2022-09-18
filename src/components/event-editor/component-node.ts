import { HtmlNode, h } from '@logicflow/core'
import { ComponentNodeModel } from '@/components/event-editor/component-node-model'

class ComponentNode extends HtmlNode {
  getAnchorShape(anchorData: any) {
    const { x, y, type } = anchorData
    return h('rect', {
      x: x - 5,
      y: y - 5,
      width: 10,
      height: 10,
      className: `custom-anchor ${
        type === 'left' ? 'incoming-anchor' : 'outgoing-anchor'
      }`,
    })
  }

  setHtml(rootEl: HTMLElement) {
    rootEl.innerHTML = ''
    const {
      properties: { fields, tableName },
    } = this.props.model
    rootEl.setAttribute('class', 'table-container')
    const container = document.createElement('div')
    container.className = 'table-node'
    const tableNameElement = document.createElement('div')
    tableNameElement.innerText = tableName
    tableNameElement.className = 'table-name'
    container.appendChild(tableNameElement)
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < fields.length; i++) {
      const item = fields[i]
      const itemElement = document.createElement('div')
      itemElement.className = 'table-field'
      const itemKey = document.createElement('span')
      itemKey.innerText = item.key
      const itemType = document.createElement('span')
      itemType.innerText = item.type
      itemType.className = 'field-type'
      itemElement.appendChild(itemKey)
      itemElement.appendChild(itemType)
      fragment.appendChild(itemElement)
    }
    container.appendChild(fragment)
    rootEl.appendChild(container)
  }
}

export default {
  type: 'component-node',
  model: ComponentNodeModel,
  view: ComponentNode,
}
