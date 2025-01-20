<template>
  <div class="h-full w-full flex items-center justify-center">
    <NCard 
      title="注册"
      class="max-w-[450px] min-w-[300px]"
    >
      <template #header-extra>
        <!-- #header-extra -->
      </template>
      <template #default>
        <n-form :model="model" :rules="rules">
          <n-form-item path="username" label="用户名">
            <n-input 
              v-model:value="model.username" 
              type="text"
              placeholder="请输入用户名"
            />
          </n-form-item>
          <n-form-item path="password" label="密码">
            <n-input 
              v-model:value="model.password" 
              type="password"
              placeholder="请输入密码"
            />
          </n-form-item>
          <n-form-item first path="passwordRe" label="重复密码">
            <n-input 
              v-model:value="model.passwordRe" 
              :disabled="!model.password" 
              type="password"
              placeholder="请再次输入密码"
            />
          </n-form-item>
          <div class="flex justify-center">
            <n-button 
              :disabled="disableClick" 
              round 
              type="primary" 
              @click="OnClickLogin"
            >
              注册
            </n-button>
          </div>
        </n-form>
      </template>
      <template #footer>
        <!-- #footer -->
      </template>
      <template #action class="flex justify-center">
        <div>
          已经有账号？
          <n-button dashed size="small">
            <router-link to="/login">登录</router-link>
          </n-button>
        </div>
      </template>
    </NCard>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { NCard, NForm, NFormItem, NButton, NInput } from 'naive-ui';

const model = ref({
  age: null,
  password: '',
  passwordRe: '',
});

const rules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: ['input', 'blur'],
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['input', 'blur'],
  },
  passwordRe: {
    required: true,
    validator: (rule, value) => {
      if (!value || value === '') {
        return new Error('请再次输入密码');
      }
      if (value !== model.value.password) {
        return new Error('两次输入密码不一致!');
      }
      return true;
    },
    trigger: ['input', 'blur'],
  },
};


const ok = () => {
  if (!model.value.username) {
    return false;
  }
  if (!model.value.password) {
    return false; 
  }
  if (model.value.password !== model.value.passwordRe) {
    return false; 
  }
  return true;
}

const disableClick = computed(() => {
  return !ok(); 
})

const OnClickLogin = () => {
  console.log('OnClickLogin'); 
}

</script>
