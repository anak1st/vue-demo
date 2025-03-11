import axios from 'axios';


const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;


export const api = axios.create({
  baseURL: VITE_BASE_URL,
})
