import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useAuthStore = defineStore('auth', () => {
  const username = ref("");
  const password = ref("");
  const token = ref("");
  const tokenType = ref("");

  const logout = () => {
    token.value = "";
    tokenType.value = "";
    username.value = "";
    password.value = "";
  }

  const isLogin = computed(() => {
    return !!token.value && !!tokenType.value;
  })

  return {
    token,
    tokenType,
    username,
    password,
    isLogin,
    logout,
  }
  
}, {
  persist: {
    storage: localStorage,
    pick: ['token', 'tokenType', 'username', 'password'],
  }
})