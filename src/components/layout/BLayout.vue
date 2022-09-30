<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BLayout',
})
</script>

<template>
  <ALayout class="layout" has-sider>
    <ALayoutSider class="sider">
      <slot name="sider"/>
    </ALayoutSider>
    <ALayout class="layout-main">
      <ALayoutHeader class="header">
        <slot name="header"/>
        <div class="header-right-actions">
          <slot name="header-right-actions"/>
        </div>
      </ALayoutHeader>
      <ALayoutContent class="content">
        <slot name="content"/>
      </ALayoutContent>
      <ALayoutFooter class="footer">
        <slot name="footer">BLOCKS</slot>
      </ALayoutFooter>
    </ALayout>
  </ALayout>
</template>

<style scoped lang="less">
@import '@/styles/var.less';

.layout {
  min-height: 100%;
  position: relative;
}

.sider {
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}

.layout-main {
  margin-left: 200px;
}

.header {
  background: #fff;
  padding: 0;
}

.content {
  display: flex;
  padding: 24px 16px 0 16px;
  overflow: initial;
  flex-direction: row;

  ::v-deep(.content-1) {
    flex-grow: 1;
    padding: 24px;
    background: #fff;

    .content-2 {
      height: 100%;
      position: relative;
    }
  }
}

.footer {
  letter-spacing: 5px;
  font-weight: 400;
  text-align: center;
}

.header {
  padding: 0 16px;

  .header-right-actions {
    height: 100%;
    float: right;
  }
}

::v-deep(.ant-layout-sider) {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;

  .ant-layout-sider-children {
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
}
</style>
