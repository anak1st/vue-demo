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
  if (response.status === 401) {
    authStore.logout();
    console.log(response);
    router.push('/login');
  }
  return Promise.resolve(response);
}, (error) => {
  return Promise.reject(error);
});
