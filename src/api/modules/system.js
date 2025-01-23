import { api } from "@/api/axios";
import { useAuthStore } from "@/store/modules/auth";


export const fetchSystemStatus = async (second, window_second) => {
  try {
    let res = await api.get('/system_status', {
      params: {
        second: second,
        window_second: window_second
      }
    });
    if (res.data.code !== 0) {
      throw new Error(res.data.msg); 
    }
    return res.data.data;
  } catch (e) {
    const authStore = useAuthStore();
    await authStore.logoutIfNoAuth();
    throw e;
  }
}
