import { 
  useState,
  useCallback,
  useMemo
} from 'react';
import styles from './nap.module.css';
import { useNavigate } from 'react-router-dom';
import { 
    Clock, 
    VolumeO,
    SettingO, 
    ArrowLeft,
    // Plus,
    // Minus
} from '@react-vant/icons';
import useTitle from '@/hooks/useTitle'
import { useNapStore } from '@/store/napStore';

const Nap = () => {
  useTitle('小憩')  
  const navigate = useNavigate();
  const [showCustomInput, setShowCustomInput] = useState(false);
  const {
    mode, 
    remainingTime, 
    isActive, 
    wakeUpTime, 
    customMinutes, 
    setMode, 
    setCustomMinutes, 
    toggleTimer, 
    getCurrentGradient, 
    formatTime, 
    formatWakeUpTime
  } = useNapStore();

  // 处理模式选择
  const handleModeSelect = useCallback((selectedMode) => {
    setMode(selectedMode);
    setShowCustomInput(selectedMode === 'custom');
    // 新增：切换模式时重置或初始化时间
    if (selectedMode !== 'custom') {
      // 根据模式设置默认时间
      const defaultMinutes = selectedMode === 'science' ? 10 : 
                            selectedMode === 'efficient' ? 24 :
                            selectedMode === 'travel' ? 40 : 90;
      setCustomMinutes(defaultMinutes);
    }
  }, [setMode, setCustomMinutes]);

    // 自定义时间增减
    const adjustCustomTime = useCallback((delta) => {
      const newMinutes = customMinutes + delta;
      setCustomMinutes(newMinutes);
    }, [customMinutes, setCustomMinutes]);

    // 缓存渐变背景计算结果
    const gradientStyle = useMemo(() => ({
      background: getCurrentGradient()
    }), [getCurrentGradient]);
  return (
    <div className={styles.container} style={gradientStyle}>
      {/* 顶部导航 */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate('/sleep')}>
          <ArrowLeft size={24} />
        </button>
        <h1 className={styles.title}>小憩</h1>
        <button className={styles.settingsButton}>
          <SettingO size={24} />
        </button>
      </div>

      {/* 时间模式选择 */}
      <div className={styles.modeSelector}>
        <button 
          className={`${styles.modeButton} ${mode === 'custom' ? styles.activeMode : ''}`} 
          onClick={() => handleModeSelect('custom')}
        >
          自定义
        </button>
        <button 
          className={`${styles.modeButton} ${mode === 'science' ? styles.activeMode : ''}`} 
          onClick={() => handleModeSelect('science')}
        >
          科学小盹 10'
        </button>
        <button 
          className={`${styles.modeButton} ${mode === 'efficient' ? styles.activeMode : ''}`} 
          onClick={() => handleModeSelect('efficient')}
        >
          高效午休 24'
        </button>
        <button 
          className={`${styles.modeButton} ${mode === 'travel' ? styles.activeMode : ''}`} 
          onClick={() => handleModeSelect('travel')}
        >
          差旅模式 40'
        </button>
        <button 
          className={`${styles.modeButton} ${mode === 'full' ? styles.activeMode : ''}`} 
          onClick={() => handleModeSelect('full')}
        >
          完整午休 90'
        </button>
      </div>

      {/* 自定义时间输入 (仅在自定义模式显示) */}
        {showCustomInput && (
        <div className={styles.customTimeControl}>
            <button onClick={() => adjustCustomTime(-1)} disabled={customMinutes <= 0}>-</button>
            <span>{customMinutes}分钟</span>
            <button onClick={() => adjustCustomTime(1)} disabled={customMinutes >= 90}>+</button>
        </div>
)}

      {/* 时间显示 */}
      <div className={styles.timerDisplay}>
        <div className={styles.timeNumbers}>{formatTime()}</div>
        <div className={styles.timeLabel}>{remainingTime > 60 ? '分钟' : '秒'}</div>
        {wakeUpTime && (
          <div className={styles.wakeUpTime}>将在 {formatWakeUpTime()} 唤醒你</div>
        )}
      </div>

      {/* 控制按钮 */}
      <div className={styles.controls}>
        <button className={styles.controlButton}>
          <VolumeO size={20} />
        </button>
        <button className={styles.mainButton} onClick={toggleTimer}>
          {isActive ? (
            <div className={styles.pauseIcon}></div>
          ) : (
            <div className={styles.playIcon}>
              <Clock size={24} />
            </div>
          )}
        </button>
        <button className={styles.controlButton}>
          <Clock size={20} />
        </button>
      </div>

      <div className={styles.statusText}>
        {isActive ? '小憩中...' : remainingTime <= 0 ? '小憩结束' : '点击开始'} 
        {mode !== 'custom' && !isActive && `(${mode === 'science' ? '10分钟' : mode === 'efficient' ? '24分钟' : mode === 'travel' ? '40分钟' : '90分钟'})`}
      </div>
    </div>
  );
};

export default Nap;
