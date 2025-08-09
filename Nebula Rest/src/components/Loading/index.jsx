import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './loading.module.css'; // 引入样式文件

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);
  const [quote, setQuote] = useState('');
  const navigate = useNavigate();

  // 睡眠相关名言（随机展示）
  const sleepQuotes = [
    "睡眠是治愈心灵的良药",
    "在星空下安眠，在梦境中遨游",
    "一夜好眠是创造力的源泉",
    "星星守护着你的睡眠",
    "每个梦都是未读的诗篇"
  ];

  useEffect(() => {
    // 模拟加载进度
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + Math.random() * 10, 100);
        
        // 每25%更换一次名言
        if (Math.floor(prev / 25) !== Math.floor(newProgress / 25)) {
          const randomIndex = Math.floor(Math.random() * sleepQuotes.length);
          setQuote(sleepQuotes[randomIndex]);
        }
        
        return newProgress;
      });
    }, 300);

    // 加载完成跳转
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        navigate('/home');
      }, 800); // 留出动画完成时间
    }

    return () => clearInterval(interval);
  }, [progress, navigate]);

  // 生成随机星星
  const renderStars = () => {
    return Array.from({ length: 50 }).map((_, i) => {
      const size = Math.random() * 3 + 1;
      const style = {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: Math.random() * 0.8 + 0.2,
        animationDelay: `${Math.random() * 2}s`
      };
      return <div key={i} className={styles.star} style={style} />;
    });
  };

  return (
    <div className={styles['loading-container']}>
      {/* 动态星空背景 */}
      <div className={styles['starry-sky']}>
        {renderStars()}
        
        {/* 中央大星星 - 进度指示器 */}
        <div className={styles['pulsar-star']}>
          <div 
            className={styles['star-core']} 
            style={{ transform: `scale(${progress/100})` }}
          />
        </div>
      </div>
      
      {/* 进度条 */}
      <div className={styles['progress-container']}>    
        <div 
          className={styles['progress-bar']} 
          style={{ width: `${progress}%` }}
        >
          <div className={styles['progress-trail']} />
        </div>
      </div>
      
      {/* 睡眠名言 */}
      <div className={styles['quote-container']}>
        <div className={styles['sleep-quote']}>{quote}</div>
      </div>
      
      {/* 底部品牌标识 */}
      <div className={styles['branding']}>
        <div className={styles['moon-icon']}>
          <div className={styles['crater']} />
          <div className={styles['crater']} />
          <div className={styles['crater']} />
        </div>
        <div className={styles['app-name']}>Nebula Rest</div>   
      </div>
    </div>
  );
};

export default LoadingPage;