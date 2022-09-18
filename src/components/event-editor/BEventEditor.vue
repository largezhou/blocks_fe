<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BEventEditor',
})
</script>

<script setup lang="ts">
import { onErrorCaptured, onMounted, ref } from 'vue'
import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
import componentNode from '@/components/event-editor/component-node'
import { Control, MiniMap } from '@logicflow/extension'
import '@logicflow/extension/lib/style/index.css'
import componentEdge from '@/components/event-editor/component-edge'
import mockEventDataList from '@/components/event-editor/mock-event-data-list'

const container = ref<HTMLElement>()
let lf: LogicFlow
const lfInvalidErr = new Error('LogicFlow instance invalid')

onErrorCaptured((err: Error) => {
  if (err === lfInvalidErr) {
    console.log(err.message)
    return false
  }
})
const checkLf = () => {
  if (!lf) {
    throw lfInvalidErr
  }
}
const onSave = () => {
  checkLf()
  console.log(JSON.stringify(lf.getGraphData(), null, 2))
}
onMounted(() => {
  lf = new LogicFlow({
    container: container.value as HTMLElement,
    plugins: [Control, MiniMap],
    grid: true,
    snapline: true,
    stopScrollGraph: true,
    nodeTextEdit: false,
    edgeTextEdit: false,
    animation: true,
    keyboard: {
      enabled: true,
    },
  })
  lf.register(componentNode)
  lf.register(componentEdge)
  lf.setDefaultEdgeType('component-edge')
  lf.setTheme({
    bezier: {
      stroke: '#afafaf',
      strokeWidth: 2,
    },
  })

  lf.extension.control.addItem({
    key: 'mini_map',
    iconClass: 'custom-minimap',
    title: '',
    text: '导航',
    onClick: (lf: LogicFlow, e: PointerEvent) => {
      if (lf.extension.miniMap.__isShow) {
        lf.extension.miniMap.hide()
      } else {
        const position = lf.getPointByClient(e.x, e.y)
        lf.extension.miniMap.show(
          position.domOverlayPosition.x - 120,
          position.domOverlayPosition.y + 35,
        )
      }
    },
  })

  lf.render(mockEventDataList)
})
</script>

<template>
  <ALayout class="layout" has-sider>
    <ALayoutSider class="sider"/>
    <ALayout class="layout-main">
      <ALayoutHeader class="header">
        <AButton type="link" class="header-btn">
          <RouterLink to="/">page</RouterLink>
        </AButton>

        <div class="header-right-actions">
          <AButton
            class="header-btn"
            type="primary"
            @click="onSave"
          >
            保存
          </AButton>
        </div>
      </ALayoutHeader>
      <ALayoutContent class="content">
        <div class="content-1">
          <div class="content-2">
            <div class="b-event-editor">
              <div ref="container" class="container"/>
            </div>
          </div>
        </div>
      </ALayoutContent>
      <ALayoutFooter class="footer">BLOCKS</ALayoutFooter>
    </ALayout>
  </ALayout>
</template>

<style lang="less">
@import '@/styles/layout.less';

.b-event-editor {
  width: 100%;
  height: 100%;

  .container {
    width: 100%;
    height: 100%;
  }

  .table-container {
    padding: 10px;
    box-sizing: border-box;
  }

  .table-node {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border-radius: 2px;
    overflow: hidden;
    border: 2px solid #93a3b4;
    border-top-width: 8px;
  }

  .lf-node-selected {
    .table-node {
      border-color: #1890ff;
    }
  }

  .table-name {
    height: 28px;
    text-align: center;
    line-height: 28px;
    background: #f5f5f5;
    font-size: 14px;
  }

  .table-field {
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }

  .field-type {
    color: #9f9c9f;
  }

  /*自定义锚点样式*/

  .custom-anchor {
    stroke: #999;
    stroke-width: 1;
    fill: #d9d9d9;
    cursor: crosshair;
    rx: 3;
    ry: 3;
  }

  .custom-anchor:hover {
    fill: #ff7f0e;
    stroke: #ff7f0e;
  }

  .lf-node-not-allow .custom-anchor:hover {
    stroke: #999;
    fill: #d9d9d9;
    cursor: not-allowed;
  }

  .incoming-anchor {
    stroke: #d79b00;
  }

  .outgoing-anchor {
    stroke: #82b366;
  }

  .custom-minimap {
    background: url('@/assets/mini_map.png');
    background-size: cover;
  }

  .lf-control {
    border-radius: 2px;
    box-shadow: none;
    border: 1px solid #93a3b4;
  }
}
</style>
