/* eslint-disable @typescript-eslint/no-explicit-any */
import { api, type ResponseData } from '@/api/axios';
import { AxiosError } from 'axios';


export interface UserInfo {
  id: number,
  username: string,
  roles: any,
  disabled: boolean,
}


export const fetchUserMe = async () => {
  try {
    const rsp = await api.get<ResponseData<UserInfo>>("/users/me");
    if (rsp.data.code !== 0) {
      throw new Error("未知错误: [" + rsp.data.code + "] " + rsp.data.msg)
    }
    return rsp.data.data;
  } catch (error) {
    throw error;
  }
}


interface UserListResponse {
  total: number,
  users: UserInfo[],
}


export const fetchUserList = async (offset: number, count: number) => {
  try {
    const res = await api.get<ResponseData<UserListResponse>>("/users/all", {
      params: {
        offset: offset,
        count: count,
      }
    });
    if (res.data.code!== 0) {
      throw new Error("未知错误: [" + res.data.code + "] " + res.data.msg)
    }
    return res.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 403) {
        throw new Error("权限不足");
      }
    }
    throw error;
  }
}
