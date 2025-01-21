import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { useRouterStore } from "./router";
import { fetchLogin, fetchRegister, saveToken, removeToken } from "@/api/modules/login";


export const useAuthStore = defineStore("auth", {
  state: () => ({
    username: "", // only for login
    password: "", // only for login
    token: "",
    redirect: "",
  }),

  getters: {
    isLogin() {
      return this.token && this.token.length > 0 && useUserStore().userInfo !== null;
    }
  },

  actions: {
    async register(username, password) {
      this.username = username;
      this.password = password;
      const res = await fetchRegister(username, password);
      return res;
    },

    async login(username, password) {
      this.username = username;
      this.password = password;
      const res = await fetchLogin(username, password);
      this.token = res.access_token;
      saveToken(this.token);
      await useUserStore().getUserInfo();
      
      if (this.redirect && this.redirect.length > 0) {
        useRouterStore().router.push(this.redirect);
        this.redirect = ""; 
      }
      useRouterStore().router.push("/");
      return res;
    },

    async logout() {
      this.token = "";
      removeToken();
      useUserStore().$reset();
      useRouterStore().router.push("/login");
    },

    async setToken(token) {
      if (!token) {
        throw new Error("token is empty");
      }
      if (token.length < 20) {
        throw new Error("token is too short"); 
      }
      this.token = token;
      saveToken(token);
    },
  },

  persist: {
    storage: localStorage,
    pick: ["token", "username", "password"],
  },
})