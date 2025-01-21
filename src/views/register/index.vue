<template>
  <div class="h-full w-full flex items-center justify-center">
    <n-card 
      title="注册"
      class="max-w-[450px] min-w-[300px] min-h-[500px]"
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
          
        </n-form>
      </template>
      <template #footer>
        <div class="flex justify-center">
          <n-button 
            :disabled="disableClick" 
            round 
            type="primary" 
            @click="OnClickRegister"
          >
            注册
          </n-button>
        </div>
      </template>
      <template #action class="flex justify-center">
        <div>
          已经有账号？
          <n-button dashed size="small">
            <router-link to="/login">登录</router-link>
          </n-button>
        </div>
      </template>
    </n-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { NCard, NForm, NFormItem, NButton, NInput, useMessage } from 'naive-ui';
import { useAuthStore } from '@/store/modules/auth'


const message = useMessage();
const authStore = useAuthStore();


const model = ref({
  username: '',
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


const disableClick = computed(() => {
  if (!model.value.username) {
    return true;
  }
  if (!model.value.password) {
    return true; 
  }
  if (model.value.password !== model.value.passwordRe) {
    return true; 
  }
  return false;
})

const OnClickRegister = async () => {
  try {
    await authStore.register(model.value.username, model.value.password); 
    message.success('注册成功');
  } catch (e) {
    console.error(e);
    message.error(e.message);
  }
}

</script>
