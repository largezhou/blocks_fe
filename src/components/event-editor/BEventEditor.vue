<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BEventEditor',
})
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Graph } from '@antv/x6'
import mockComponentEventList from '@/components/event-editor/mock-component-event-list'
import mockComponentDataList from '@/components/page-editor/mock-component-data-list'
import { componentMap } from '@/components/b-components'
import BSvgIcon from '@/components/svg-icon/BSvgIcon.vue'

const container = ref<HTMLElement>()
let graph: Graph
const components = mockComponentDataList
console.log(components)

const onSave = () => {
  console.log(JSON.stringify(graph.toJSON(), null, 2))
}
onMounted(() => {
  graph = new Graph({
    container: container.value,
    background: {
      color: '#f1f1f1',
    },
    grid: {
      size: 20,
      visible: true,
    },
    panning: true,
    selecting: {
      enabled: true,
      showNodeSelectionBox: true,
      multiple: false,
    },
    connecting: {
      allowBlank: false,
      allowLoop: false,
      allowNode: false,
      allowEdge: false,
      connector: {
        name: 'smooth',
      },
    },
  })

  graph.fromJSON(mockComponentEventList)

  const edgeAnimAttr = {
    stroke: '#1890ff',
    strokeDasharray: 10,
    style: {
      animation: 'edge-anim 30s infinite linear',
    },
  }
  const edgeDefaultAttr = {
    stroke: 'black',
    strokeDasharray: null,
    style: {
      animation: null,
    },
  }
  graph.on('edge:selected', ({ edge }) => {
    edge.attr('line', edgeAnimAttr)
  })
  graph.on('edge:unselected', ({ edge }) => {
    edge.attr('line', edgeDefaultAttr)
  })
  graph.on('edge:mouseenter', ({ edge }) => {
    edge.attr('line', edgeAnimAttr)
  })
  graph.on('edge:mouseleave', ({ cell, edge }) => {
    // 如果边没有被选中，则鼠标移开时，取消动画
    graph.isSelected(cell) || edge.attr('line', edgeDefaultAttr)
  })
})
</script>

<template>
  <ALayout class="layout" has-sider>
    <ALayoutSider class="sider components-panel">
      <div
        v-for="component in components"
        :key="component.id"
        class="component-item"
      >
        <BSvgIcon :name="`component-${componentMap[component.name]?.icon || '_default'}`"/>
        <span class="component-name">{{ componentMap[component.name]?.showName || '无效' }}</span>
      </div>
    </ALayoutSider>
    <ALayout class="layout-main">
      <ALayoutHeader class="header">
        <AButton type="link" class="header-btn">
          <RouterLink to="/">页面</RouterLink>
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
          <div ref="container" class="content-2 b-event-editor"/>
        </div>
      </ALayoutContent>
      <ALayoutFooter class="footer">BLOCKS</ALayoutFooter>
    </ALayout>
  </ALayout>
</template>

<style scoped lang="less">
@import '@/styles/layout.less';

.b-event-editor {
  border: 2px solid #1890ff;
  width: 100%;
  height: 100%;

  ::v-deep(.x6-widget-selection-box) {
    border-color: #1890ff;
  }
}

@sider-color: #b3b9bf;
.components-panel {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  user-select: none;

  ::v-deep(.ant-layout-sider-children) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    width: 100%;
    align-items: center;
  }

  .component-item {
    flex-basis: 50%;
    display: inline-block;
    width: 70px;
    height: 70px;
    margin: 4px 0;
    text-align: center;
    color: @sider-color;
    user-select: none;

    &:hover {
      color: #fff;
    }

    svg {
      font-size: 25px;
    }

    .component-name {
      display: block;
    }
  }

  .category {
    color: @sider-color;
    border-color: @sider-color;
  }
}
</style>

<style lang="less">
@keyframes edge-anim {
  to {
    stroke-dashoffset: -1000
  }
}
</style>
