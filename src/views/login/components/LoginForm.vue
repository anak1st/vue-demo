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
  </n-form>
  <n-button 
    type="primary" block secondary strong
    :disabled="disableClick" @click="login"
  >
    登录
  </n-button>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { NForm, NFormItemRow, NInput, NButton, useMessage } from 'naive-ui';
import type { FormRules } from 'naive-ui';
import { useAuthStore, useUserStore } from '@/stores';
import { fetchLogin } from '@/api';


const router = useRouter();
const message = useMessage();
const authStore = useAuthStore();
const userStore = useUserStore();


const model = ref({
  username: authStore.username,
  password: authStore.password,
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
  }
};


const disableClick = computed(() => {
  if (!model.value.username) {
    return true;
  }
  if (!model.value.password) {
    return true; 
  }
  return false;
})


const login = async () => {
  try {
    const res = await fetchLogin(model.value.username, model.value.password);
    authStore.token = res.access_token;
    authStore.tokenType = res.token_type;
    authStore.username = model.value.username;
    authStore.password = model.value.password;
    await userStore.update(true);
    message.success('登录成功');
    router.push('/');
  } catch (err) {
    if (err instanceof Error) {
      message.error(err.message);
    }
  }
}


</script>