import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchUserMe } from '@/api';


export const useUserStore = defineStore('user', () => {
  const userInfo = ref<Api.UserInfo | null>(null);
  const lastUpdateTime = ref<number>(0);
  const updateInterval = 60; // seconds

  const user = computed(() => {
    update(false);
    return userInfo.value;
  })

  const username = computed(() => {
    return user.value?.username || "N/A";
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
    return user.value?.roles || [];
  })

  const timeout = computed(() => {
    return Date.now() - lastUpdateTime.value > updateInterval * 1000;
  })

  const update = async (force: boolean) => {
    if (!force && !timeout.value && userInfo.value) {
      return;
    }
    lastUpdateTime.value = Date.now();
    try {
      userInfo.value = await fetchUserMe();
      console.log("update user info success");
    } catch (error) {
      logout();
      console.error("update user info failed");
      console.error(error);
    }
  }

  const logout = () => {
    userInfo.value = null;
  }

  return {
    user,
    username,
    username0,
    roles,
    logout,
    update,
  }
})