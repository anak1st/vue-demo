import { api } from '@/api/axios';
import { AxiosError } from 'axios';


export const fetchUserMe = async () => {
  try {
    const rsp = await api.get<Api.R<Api.User>>("/users/me");
    if (rsp.data.code !== 0) {
      throw new Error("未知错误: [" + rsp.data.code + "] " + rsp.data.msg)
    }
    return rsp.data.data;
  } catch (error) {
    throw error;
  }
}


export const fetchUserList = async (page_no: number, page_size: number, ) => {
  try {
    const res = await api.get<Api.R<Api.Page<Api.User>>>("/users/all", {
      params: {
        page_no,
        page_size,
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


export const fetchRoleList = async (page_size: number, page_no: number) => {
  try {
    const res = await api.get<Api.R<Api.Page<Api.Role>>>("/roles/all", {
      params: {
        page_size,
        page_no,
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
