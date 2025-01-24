import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './user';


export const useAuthStore = defineStore('auth', () => {
  const username = ref("");
  const password = ref("");
  const token = ref("");

  const logout = () => {
    token.value = "";
  }


  const isLogin = async () => {
    if (!token.value || token.value.length === 0) {
      return false;
    }
    const userStore = useUserStore();
    try {
      await userStore.update(false);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }


  return {
    username,
    password,
    token,
    logout,
    isLogin,
  }

}, {
  persist: {
    storage: localStorage,
    pick: ['token', 'username', 'password'],
  }
})