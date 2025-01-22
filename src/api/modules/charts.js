import { api } from "@/api/axios";


export const fetchSystemStatus = async (second, window_second) => {
  try {
    let res = await api.get('/system_status', {
      second,
      window_second
    });
    return res.data;
  } catch (e) {
    throw e;
  }
}
