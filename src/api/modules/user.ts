 
import type { ResponseData } from '@/api/axios';
import { api } from "@/api/axios";


export interface UserInfo {
  username: string,
  roles: string[],
  disabled: boolean,
}


export const fetchUserMe = async () => {
  try {
    const res = await api.get<ResponseData<UserInfo>>("/users/me");
    if (res.data.code !== 0) {
      if (res.data.code === 101) {
        throw new Error("错误: [" + res.data.code + "] 用户名已存在");
      }
      throw new Error("未知错误: [" + res.data.code + "] " + res.data.msg)
    }
    return res.data.data;
  } catch (error) {
    throw error;
  }
}