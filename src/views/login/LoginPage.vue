<template>
  <div class="h-full w-full flex items-center justify-center">
    <n-card class="max-w-[400px]">
      <n-tabs
        :value="tabValue"
        size="large"
        animated
        class="pb-4"
      >
        <n-tab name="login"    tab="登录" @click="tabValue = 'login'" />
        <n-tab name="register" tab="注册" @click="tabValue = 'register'" />
      </n-tabs>
      <div v-if='tabValue === "login"'>
        <LoginForm />
        <div class="flex justify-center pt-3">
          没有账号？
          <n-button text @click="tabValue = 'register'" >
            <div class="text-blue-400">注册</div>
          </n-button>
        </div>
      </div>
      <div v-else>
        <RegisterForm />
        <div class="flex justify-center pt-3">
          已经有账号？
          <n-button text @click="tabValue ='login'" >
            <div class="text-blue-400">登录</div>
          </n-button>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NCard, NTabs, NTab, NButton } from 'naive-ui';
import LoginForm    from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';

const tabValue = ref('login');

</script>
