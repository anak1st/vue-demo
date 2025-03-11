<template>
  <n-form 
    :model="model" :rules="rules"
  >
    <n-form-item-row label="用户名">
      <n-input 
        v-model:value="model.username"
        placeholder="请输入用户名"
      />
    </n-form-item-row>
    <n-form-item-row label="密码">
      <n-input 
        v-model:value="model.password"
        type="password"
        placeholder="请输入密码"
      />
    </n-form-item-row>
    <n-form-item-row label="重复密码">
      <n-input 
        v-model:value="model.passwordRe"
        type="password"
        placeholder="请再次输入密码"
      />
    </n-form-item-row>
  </n-form>
  <n-button 
    type="primary" block secondary strong
    :disabled="disableClick" @click="register"
  >
    注册
  </n-button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { NForm, NFormItemRow, NInput, NButton, useMessage } from 'naive-ui';
import type { FormRules } from 'naive-ui';
import { useAuthStore } from '@/stores';
import { fetchRegister } from '@/api';


const message = useMessage();
const authStore = useAuthStore();


const model = ref({
  username: authStore.username,
  password: authStore.password,
  passwordRe: '',
});


const rules : FormRules = {
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
      if (value!== model.value.password) {
        return new Error('两次输入密码不一致!');
      }
      return true;
    },
    trigger: ['input', 'blur'],
  },
};


const disableClick = computed(() => {
  if (!model.value.username) {
    return true;
  }
  if (!model.value.password) {
    return true;
  }
  if (!model.value.passwordRe) {
    return true;
  }
  if (model.value.password!== model.value.passwordRe) {
    return true;
  }
  return false;
})


const register = async () => {
  try {
    await fetchRegister(model.value.username, model.value.password);
    message.success('注册成功');
    authStore.password = model.value.password;
    authStore.username = model.value.username;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      message.error(error.message);
    }
  }
}

</script>