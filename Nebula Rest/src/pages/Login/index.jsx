import {
  useState,
  useRef,
  useEffect
} from 'react';
import { 
  useNavigate, 
} from 'react-router-dom';
import { 
  UserO,
  Lock
} from '@react-vant/icons';
import styles from './login.module.css';
import { useUserStore } from '@/store/user';
import  useTitle  from '@/hooks/useTitle';

const Login = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const { Login, isLogin } = useUserStore();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  useTitle('登录');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !password) {
      setError('请输入用户名或密码');
      return;
    }

    try {
      await Login({ username, password });
      // 登录成功后导航
      navigate('/');
    } catch (err) {
      setError('登录失败，请检查用户名和密码');
      console.error('Login error:', err);
    }
  };

  // 监听登录状态变化，如果已登录则直接导航
  useEffect(() => {
    if (isLogin) {
      navigate('/profile');
    }
  }, [isLogin, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        星眠
      </div>
      <div className={styles.loginCard}>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label htmlFor="username" className={styles.label}>
              <UserO size={16} style={{ marginRight: '5px' }} /> 用户名
            </label>
            <input 
              type="text" 
              id="username" 
              ref={usernameRef} 
              required
              placeholder="请输入用户名" 
              className={styles.input}
            />
          </div>
          <div>
            <label htmlFor="password" className={styles.label}>
              <Lock size={16} style={{ marginRight: '5px' }} /> 密码
            </label>
            <input 
              type="password" 
              id="password" 
              ref={passwordRef} 
              required
              placeholder="请输入密码" 
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>登录</button>
        </form>
      </div>
    </div>
  );
};

export default Login;