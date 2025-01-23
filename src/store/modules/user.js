import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { fetchUserMe } from "@/api/modules/auth";


export const useUserStore = defineStore("user", () => {
  const userInfo = ref(null);
  const lastUpdateTime = ref(null);

  const username = computed(() => {
    return userInfo.value?.username || '无法获取用户名' 
  });

  const role = computed(() => {
    return userInfo.value?.role || '无法获取角色'
  });

  const getUserInfo = async (force = false) => {
    if (force || !userInfo.value || lastUpdateTime.value < new Date().getTime() - 1000 * 60) {
      userInfo.value = await fetchUserMe();
      lastUpdateTime.value = new Date().getTime();
    }
    if (!userInfo.value) {
      throw new Error("获取用户信息失败"); 
    }
    if (!userInfo.value.username) {
      throw new Error("获取用户信息失败");
    }
    return userInfo.value;
  };

  const logout = () => {
    userInfo.value = null;
  }

  return {
    userInfo,
    username,
    role, 
    getUserInfo,
    logout
  }
})