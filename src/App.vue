<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
</script>

<template>
  <AConfigProvider :locale="zhCN">
    <router-view/>
  </AConfigProvider>
</template>
