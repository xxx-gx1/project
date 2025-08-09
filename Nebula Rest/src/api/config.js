import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5173';
// 拦截器  
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token') || '';

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },);
axios.interceptors.response.use(res => {
    return res;
},
  (error) => {
    if (error.response && error.response.status === 401) {
      // 未授权，清除token并跳转到登录页
      const { Logout } = useUserStore.getState();
      Logout();
    }
    return Promise.reject(error);
  })
export default axios;
