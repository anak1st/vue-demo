import { api, type ResponseData } from "@/api/axios";


interface CPUUsage {
  value: number;
  timestamp: number;
  localtime: string;
}

interface MemoryUsage {
  value: number;
  timestamp: number;
  localtime: string;
}

interface SystemStatus {
  cpu_usage: CPUUsage[];
  memory_usage: MemoryUsage[];
}


export const fetchSystemStatus = async (second: number, aggregate_window: number) => {
  try {
    const response = await api.get<ResponseData<SystemStatus>>('/system_status', {
      params: {
        second: second,
        aggregate_window: aggregate_window
      }
    });
    if (response.data.code !== 0) {
      throw new Error(response.data.msg); 
    }
    return response.data.data;
  } catch (e) {
    throw e;
  }
}
