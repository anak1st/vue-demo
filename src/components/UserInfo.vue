<template>
  <n-dropdown
    trigger="hover"
    :options="options"
    size="medium"
    @select="handleSelect"
  >
    <n-button quaternary class="flex !px-0">
      <UserAvatar />
      <div class="flex justify-center items-center px-3 text-lg">
        {{ userStore.username }}
      </div>
    </n-button>
  </n-dropdown>
</template>

<script setup lang="ts">
import { h, type Component } from 'vue';
import { useRouter } from 'vue-router';
import { NButton, NDropdown, useMessage } from 'naive-ui';
import { LogoutIcon, ChangeIcon, PersonIcon } from './icons';
import UserAvatar from '@/components/UserAvatar.vue';
import { useUserStore, useAuthStore } from '@/stores';


const router = useRouter();
const message = useMessage();
const userStore = useUserStore();
const authStore = useAuthStore();


function renderIcon(icon: Component) {
  return h(icon, { class: 'w-5 h-5' })
}


const options = [
  {
    label: '个人信息',
    key: 'profile',
    icon: () => renderIcon(PersonIcon),
  },
  {
    label: '切换角色',
    key: 'switchRole',
    icon: () => renderIcon(ChangeIcon),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: () => renderIcon(LogoutIcon),
  },
];


const handleSelect = (key: string) => {
  switch (key) {
    case 'profile':
      message.info('个人信息');
      router.push('/profile');
      break;
    case 'switchRole':
      message.info('切换角色');
      break;
    case 'logout':
      message.info('退出登录');
      authStore.logout();
      router.push('/login');
      break;
  }
};


</script>