import { defineStore } from "pinia";
import { fetchUserInfo } from "@/api/modules/user";


export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: null,
  }),

  getters: {
    username() {
      return this.userInfo?.username || '无法获取用户名'
    },
    role() {
      return this.userInfo?.role || '无法获取角色'
    }
  },

  actions: {
    async getUserInfo() {
      if (!this.userInfo) {
        this.userInfo = await fetchUserInfo();
      }
      if (!this.userInfo) {
        throw new Error("获取用户信息失败"); 
      }
      if (!this.userInfo.username) {
        throw new Error("获取用户信息失败");
      }
      return this.userInfo;
    },
  }
})