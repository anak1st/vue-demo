import { api } from "@/api/axios";
import { useAuthStore } from "@/store/modules/auth";


export const fetchSystemStatus = async (second, aggregate_window) => {
  try {
    let res = await api.get('/system_status', {
      params: {
        second: second,
        aggregate_window: aggregate_window
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
