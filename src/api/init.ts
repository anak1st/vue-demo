import { api } from "./axios";
import { useAuthStore } from "@/stores";
import { router } from "@/router";



// must be called after pinia & router is initialized
export const setupAxios = () => {
  const authStore = useAuthStore();

  api.interceptors.request.use((config) => {
    if (authStore.isLogin) {
      if (authStore.tokenType === 'bearer') {
        config.headers.Authorization = 'Bearer ' + authStore.token;
      } else {
        console.error("tokenType \"" + authStore.tokenType + "\" is not supported");
      }
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
    if (error.response.status === 401) {
      console.error("ERROR 401");
      authStore.logout();
      router.push("/login");
    }
    if (error.response.status === 403) {
      console.error("ERROR 403");
    }
    return Promise.reject(error);
  });
}
