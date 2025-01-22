import { api } from "@/api/axios";


export const saveToken = (token) => {
  if (!token) {
   throw new Error("token is empty"); 
  }
  if (token.length < 20) {
    throw new Error("token is too short"); 
  }
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


export const removeToken = () => {
  delete api.defaults.headers.common['Authorization'];
}


export const fetchLogin = async (username, password) => {
  try {
    const form = new FormData();
    form.append('username', username);
    form.append('password', password);
    let res = await api.post('/login', form);
    return res.data;
  } catch (e) {
    if (e.response?.data?.detail === 'Incorrect username or password') {
      throw new Error("用户名或密码错误");
    }
    throw e;
  }
}


export const fetchRegister = async (username, password) => {
  try {
    const res = await api.post('/users/create', {
      username,
      password
    })
    if (res.data.code !== 0) {
      if (res.data.code === 101) {
        throw new Error("错误: [" + res.data.code + "] 用户名已存在");
      }
      throw new Error("未知错误: [" + res.data.code + "] " + res.data.message);
    }
    return res.data;
  } catch (e) {
    throw e;
  }
}
