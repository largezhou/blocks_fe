<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BEventEditor',
})
</script>

<script setup lang="ts">
import { ref } from 'vue'

const container = ref<HTMLElement>()
const onSave = () => {
  console.log('onSave')
}
</script>

<template>
  <ALayout class="layout" has-sider>
    <ALayoutSider class="sider"/>
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
}
</style>
