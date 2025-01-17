import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    username: "no_username",
    role: "no_role",
  }),
})