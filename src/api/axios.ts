import axios from 'axios';
import { useAuthStore } from '@/stores';
import { router } from '@/router';


const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;


export const api = axios.create({
  baseURL: VITE_BASE_URL,
})


export interface ResponseData<T> {
  code: number;
  msg: string;
  data: T | null;
}


api.interceptors.request.use((config) => {  
  const authStore = useAuthStore();
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
})


api.interceptors.response.use((response) => {
  const authStore = useAuthStore();
  const data = response.data;
  if (data.code === 401) {
    authStore.token = '';
    console.error('登录过期');
    router.push('/login');
  }
  return Promise.resolve(response);
}, (error) => {
  return Promise.reject(error);
});
