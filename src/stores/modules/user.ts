import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchUserMe, type UserInfo } from '@/api';


export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null);
  const lastUpdateTime = ref<number>(0);
  const updateInterval = 60; // seconds

  
  const username = computed(() => {
    return userInfo.value?.username || "";
  })


  const username0 = computed(() => {
    const ch = username.value[0];
    // if ch is english, return uppercase
    if (ch.match(/[a-zA-Z]/)) {
      return ch.toUpperCase();
    }
    return ch;
  })

  
  const roles = computed(() => {
    return userInfo.value?.roles || [];
  })


  const timeout = computed(() => {
    return Date.now() - lastUpdateTime.value > updateInterval * 1000;
  })


  const update = async (force: boolean) => {
    if (!force && !timeout.value && userInfo.value) {
      return false;
    }
    lastUpdateTime.value = Date.now();
    const res = await fetchUserMe();
    userInfo.value = res;
    if (!userInfo.value) {
      throw new Error("获取用户信息失败");
    }
    if (!username.value) {
      throw new Error("获取用户信息失败, 用户名为空");
    }
    return true;
  }


  const logout = () => {
    userInfo.value = null;
  }


  return {
    userInfo,
    username,
    username0,
    roles,
    logout,
    update,
  }
})