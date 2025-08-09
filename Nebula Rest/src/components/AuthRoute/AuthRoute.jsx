import { useEffect } from 'react';
import { useUserStore } from '@/store/user';
import {
  useNavigate,
  useLocation
} from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const { isLogin } = useUserStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // 移除空依赖数组，使其在isLogin变化时重新执行
  useEffect(() => {
    if (!isLogin) {
      navigate('/login', { from: pathname });
    }
  }, [isLogin, navigate, pathname]);

  // 只有登录后才渲染子组件
  return isLogin ? <>{children}</> : null;
};

export default AuthRoute;
