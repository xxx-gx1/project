import axios from './config';

export const doLogin = (data) => {
    return axios.post('/api/login',data);
}


export const getUserInfo = () => {
  // 添加Authorization头
  const token = localStorage.getItem('token');
  return axios.get('/user/info', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};