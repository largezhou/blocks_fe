<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BPageEditor',
})
</script>

<script setup lang="ts">
</script>

<template>
  <ALayout class="layout" has-sider>
    <ALayoutSider class="sider"/>
    <ALayout class="layout-main">
      <ALayoutHeader class="header"/>
      <ALayoutContent class="content">
        <div/>
      </ALayoutContent>
      <ALayoutFooter class="footer">BLOCKS</ALayoutFooter>
    </ALayout>
  </ALayout>
</template>

<style scoped lang="less">
@import '@/styles/layout.less';
</style>
