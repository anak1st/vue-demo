<template>
  <n-dropdown
    trigger="hover"
    :options="options"
    size="medium"
    @select="handleSelect"
  >
    <div class="flex">
      <UserAvatar />
      <div class="flex flex-col items-center min-w-[110px]">
        <span>
          {{ userStore.username }}
        </span>
        <span class="text-xs text-neutral-500 dark:text-neutral-400">
          [ {{ userStore.role }} ]
        </span>
      </div>
    </div>
  </n-dropdown>
</template>

<script setup>
import { h } from 'vue';
import { useRouter } from 'vue-router';
import { NIcon, NDropdown, useMessage } from 'naive-ui';
import { 
  LogOutOutlined as LogoutIcon,
  ChangeCircleOutlined as ChangeIcon,
  PersonOutlined as PersonIcon,
} from '@vicons/material';
import UserAvatar from '@/components/UserAvatar.vue';
import { useUserStore } from '@/store/modules/user';
import { useAuthStore } from '@/store/modules/auth';


const router = useRouter();
const message = useMessage();
const userStore = useUserStore();
const authStore = useAuthStore();


function renderIcon(icon) {
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


const handleSelect = (key) => {
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
      break;
  }
};


</script>