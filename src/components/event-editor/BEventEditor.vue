<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BEventEditor',
})
</script>

<script setup lang="ts">
import { PageData } from '@/components/editor/types'
import BLayout from '@/components/layout/BLayout.vue'
import BChangeMode from '@/components/editor/BChangeMode.vue'

defineProps<{
  page?: PageData
}>()
</script>

<template>
  <BLayout>
    <template #header>
      <BChangeMode/>
    </template>

    <template #content>
      <div class="content-1">
        <div class="content-2"/>
      </div>
    </template>
  </BLayout>
</template>

<style scoped lang="less">
</style>
