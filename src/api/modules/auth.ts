import { api, type ResponseData } from '@/api/axios';
import { AxiosError } from 'axios';


interface LoginResponse {
  access_token: string;
  token_type: string;
}


export const fetchLogin = async (username: string, password: string) => {
  try {
    const fromData = new FormData();
    fromData.append('username', username);
    fromData.append('password', password);
    const response = await api.post<LoginResponse>('/login', fromData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const detail = error.response?.data.detail;
      if (detail === 'Incorrect username or password') {
        throw new Error('用户名或密码错误');
      }
    }
    throw error;
  }
}


export const fetchRegister = async (username: string, password: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await api.post<ResponseData<any>>('/users/create', {
      username,
      password,
    });
    if (response.data.code !== 0) {
      if (response.data.code === 101) {
        throw new Error('用户名已存在');
      } else {
        console.error(response.data);
        throw new Error('未知错误 [' + response.data.code + '] ' + response.data.msg);
      }
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
}
