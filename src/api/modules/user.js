import { api } from "@/api/axios";


export const fetchUserInfo = async () => {
  try {
    const res = await api.get("/users/me"); 
    if (res.data.code !== 0) {
      if (res.data.code === 101) {
        throw new Error("错误: [" + res.data.code + "] 用户名已存在"); 
      } 
      throw new Error("未知错误: [" + res.data.code + "] " + res.data.message)
    }
    return res.data.data;
  } catch (e) {
    throw e;
  }
}