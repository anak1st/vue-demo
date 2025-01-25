import { api } from "./axios";
import { useAuthStore } from "@/stores";
import { router } from "@/router";



// must be called after pinia & router is initialized
export const setupAxios = () => {
  const authStore = useAuthStore();

  api.interceptors.request.use((config) => {
    if (authStore.isLogin) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  })

  api.interceptors.response.use((response) => {
    if (response.status === 401) {
      console.log(response);
      authStore.logout();
      router.push("/login");
    }
    return Promise.resolve(response);
  }, (error) => {
    // network error
    console.log("Network error");
    // authStore.logout();
    // router.push("/login");
    return Promise.reject(error);
  });
}
