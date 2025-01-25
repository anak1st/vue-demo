import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useAuthStore = defineStore('auth', () => {
  const username = ref("");
  const password = ref("");
  const token = ref("");

  const logout = () => {
    token.value = "";
  }

  const isLogin = computed(() => {
    return !!token.value && token.value.length > 10;
  })

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