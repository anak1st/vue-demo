<template>
  <div class="flex">
    <n-dropdown
      trigger="hover"
      :options="options"
      size="medium"
      @select="handleSelect"
    >
      <n-button :round="!isInSider" strong secondary size="large" class="flex-1 !px-1" >
        <UserAvatar />
        <div 
          v-if="showUsername"
          :class="'flex-1 flex justify-center items-center px-3 text-lg' + usernameclass"
          :style="usernameStyle"
        >
          {{ userStore.username }}
        </div>
      </n-button>
    </n-dropdown> 

    <n-drawer v-model:show="showDrawer" :width="450" placement="right">
      <n-drawer-content closable>
        <template #header>
          个性化
        </template>
        <Personalization />
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import { h, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { NButton, NDropdown, NDrawer, NDrawerContent, useMessage } from 'naive-ui';
import { renderIcon } from '@/components/icons';
import Personalization from '@/components/Personalization.vue';
import UserAvatar from '@/components/UserAvatar.vue';
import { useUserStore, useAuthStore, useTabStore, useThemeStore } from '@/stores';


const router = useRouter();
const message = useMessage();
const userStore = useUserStore();
const authStore = useAuthStore();
const tabStore = useTabStore();
const themeStore = useThemeStore();


const props = defineProps<{
  isInSider?: boolean;
}>();


const usernameStyle = computed(() => {
  return props.isInSider ? 'min-width: 100px;' : ''
});
const usernameclass = computed(() => {
  return (props.isInSider && themeStore.theme.sider.inverted) ? ' text-white' : '';
});


const showUsername = computed(() => {
  if (props.isInSider && themeStore.theme.sider.isCollapse) {
    return false;
  } else {
    return true;
  }
});


const iconArgs = {
  size: 22,
};


const options = [
  {
    label: '个人信息',
    key: 'profile',
    icon: renderIcon('person', iconArgs),
  },
  {
    label: '切换角色',
    key: 'switchRole',
    icon: renderIcon('change', iconArgs),
  },
  {
    label: '个性化',
    key: 'personalization',
    icon: renderIcon('colors', iconArgs),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon('logout', iconArgs),
  },
];


const showDrawer = ref(false);


const handleSelect = (key: string) => {
  switch (key) {
    case 'profile':
      message.info('个人信息');
      router.push('/profile');
      break;
    case 'switchRole':
      message.info('切换角色');
      break;
    case 'personalization':
      message.info('个性化');
      showDrawer.value = true;
      break;
    case 'logout':
      message.info('退出登录');
      authStore.logout();
      tabStore.clear(false);
      router.push('/login');
      break;
  }
};


</script>