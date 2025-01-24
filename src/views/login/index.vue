<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="h-full w-full flex items-center justify-center">
    <n-card class="max-w-[500px]">
      <n-tabs
        :value="tabValue"
        size="large"
        animated
      >
        <n-tab-pane 
          name="login" tab="登录"
        >
        <login-form />
          <div class="flex justify-center pt-5">
            没有账号？
            <n-button text @click="tabValue = 'register'" >
              <div class="text-blue-400">注册</div>
            </n-button>
          </div>
        </n-tab-pane>
        <n-tab-pane 
          name="register" tab="注册"
        >
        <register-form />
          <div class="flex justify-center pt-5">
            已经有账号？
            <n-button text @click="tabValue ='login'" >
              <div class="text-blue-400">登录</div>
            </n-button>
          </div>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NCard, NTabs, NTabPane, NButton } from 'naive-ui';
import LoginForm    from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';


const tabValue = ref('login');

</script>
