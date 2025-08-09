import{
    create
} from 'zustand';
import { doLogin, getUserInfo } from '@/api/user';

// 添加初始化函数，从localStorage恢复登录状态
const initUser = () => {
  return {
    user: null,
    isLogin: false,
    token: localStorage.getItem('token') || null
  };
};

export const useUserStore = create((set, get) => ({
  ...initUser(),
  // 验证token并初始化用户信息
  initAuth: async () => {
    const { token } = get();
    if (token) {
      try {
        // 验证token并获取用户信息
        const res = await getUserInfo();
        set({
          user: res.data,
          isLogin: true
        });
      } catch (error) {
        // token无效，清除token
        localStorage.removeItem('token');
        set({
          token: null
        });
        console.error('Token validation failed:', error);
      }
    }
  },
  Login: async ({ username = '', password = '' }) => {
    const res = await doLogin({ username, password });
    const { token, data: user } = res.data;
    localStorage.setItem('token', token);
    set({
      user,
      isLogin: true,
      token
    });
  },
  Logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      isLogin: false,
      token: null
    });
  },
  updateUserInfo: (userInfo) => {
    set({
      user: userInfo
    });
  }
}));