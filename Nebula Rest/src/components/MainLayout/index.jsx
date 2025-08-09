import {
    useState,
    useEffect
} from 'react';
import {
    Tabbar
} from 'react-vant';
import {
    HomeO,
    UserO,
    ClockO,
    NewspaperO,
    ChatO
} from '@react-vant/icons';
import { 
    Outlet,
    useNavigate,
    useLocation
} from 'react-router-dom'

// 菜单栏配置
const tabs = [
    {title: '首页',icon: <HomeO/>,path: '/home'},
    {title: '故事',icon: <NewspaperO  />,path: '/stories'},
    {title: '睡觉',icon: <ClockO  />,path: '/sleep'},
    {title: '睡眠助手',icon: <ChatO  />,path: '/chat'},
    {title: '我的',icon:  <UserO />,path: '/profile'},

]
const MainLayout = () => {
    const [active, setActive] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        console.log(location.pathname,'/////');
        // es6的使用power
        const index = tabs.findIndex(tab => location.pathname.startsWith(tab.path));
        setActive(index);
    },[location.pathname])
  return (
    <div 
    className='flex flex-col h-screen'
    style={{paddingBottom: '60px'}}
    >
      <div className='flex-1'>
        <Outlet />
      </div>
      {/* tabbar */}
      <Tabbar value={active} onChange={
        (key) => {
            setActive(key);
            navigate(tabs[key].path);
        }
      }>
        {tabs.map((item, index) => (
            <Tabbar.Item key={index} icon={item.icon}>
                {item.title}
            </Tabbar.Item>
        ))}
      </Tabbar>
    </div>
  )
}

export default MainLayout