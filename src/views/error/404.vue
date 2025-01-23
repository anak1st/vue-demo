<template>
  <div class="w-full h-full flex justify-center items-center">
    <n-result
      m-auto
      status="404"
      title="404 您访问的页面不存在"
      description="生活总归带点荒谬"
      size="large"
    >
      <template #footer>
        <n-button type="primary" ghost @click="router.replace('/')">
          返回首页
        </n-button>
      </template>
    </n-result>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { NResult, NButton } from 'naive-ui'

const router = useRouter()
const route = useRoute()

</script>
