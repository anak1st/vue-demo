import { defineStore } from "pinia";
import { ref } from "vue";
import { router } from "@/router";
import { useUserStore } from "./user";
import { fetchLogin, fetchRegister, useToken } from "@/api/modules/auth";


export const useAuthStore = defineStore("auth", () => {
  const username = ref("");
  const password = ref("");
  const token = ref("");
  const redirect = ref("");

  const userStore = useUserStore();
  const tokenApi = useToken();


  const isLogin = async () => {
    if (!(token.value && token.value.length > 0)) {
      return false;
    }
    
    if (userStore.userInfo === null) {
      setToken(token.value);
    }

    try {
      await userStore.getUserInfo(); 
    } catch (e) {
      console.error(e);
      return false; 
    }

    return token.value && token.value.length > 0 && userStore.userInfo !== null;
  };


  const register = async (username_, password_) => {
    username.value = username_;
    password.value = password_;
    const res = await fetchRegister(username.value, password.value);
    return res;
  };


  const login = async (username_, password_) => {
    username.value = username_;
    password.value = password_;
    const res = await fetchLogin(username.value, password.value);
    token.value = res.access_token;
    setToken(token.value);
    await userStore.getUserInfo();
    
    if (redirect.value && redirect.value.length > 0) {
      router.push(redirect.value);
      redirect.value = ""; 
    }
    router.push("/");
    return res;
  };


  const setToken = (token_) => {
    if (!token_) {
      throw new Error("token is empty");
    }
    if (token_.length < 20) {
      throw new Error("token is too short"); 
    }
    token.value = token_;
    tokenApi.set(token.value);
  };


  const removeToken = () => {
    token.value = "";
    tokenApi.remove();
  };


  const logout = () => {
    token.value = "";
    removeToken();
    userStore.logout();
    router.push("/login");
  };


  const logoutIfNoAuth = async () => {
    try {
      await userStore.getUserInfo(true); 
      return true;
    } catch (e) {
      console.error(e);
      logout();
      return false;
    }
  }

  
  return {
    username,
    password,
    token,
    redirect,
    isLogin,
    register, 
    login,
    logout,
    logoutIfNoAuth,
  }
}, {
    persist: {
    storage: localStorage,
    pick: ["token", "username", "password"],
  },
})