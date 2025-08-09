import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  Gift,
  GuideO
} from '@react-vant/icons';
import styles from './sleep.module.css';
import useTitle from '@/hooks/useTitle'

const Sleep = () => {
  const navigate = useNavigate();
  useTitle('睡觉')

  const handleFeatureNotImplemented = () => {
    alert(`功能暂未实现`);
  };

  return (
    <div className={styles.container}>
      {/* 顶部标题区域 */}
      <div className={styles.header}>
        <h1 className={styles.title}>拂晓时</h1>
        <p className={styles.subtitle}>给你表演一个 秒就睡着哦，晚心</p>
        <Gift className={styles.decorIcon} size={16} />
      </div>

      {/* 主视觉区域 */}
      <div className={styles.heroSection}>
        <div className={styles.backgroundImage} />
        <div className={styles.promptCard}>
          <span className={styles.promptText}>一起来装扮你的「小窝」</span>
          <button className={styles.decorButton} onClick={() => handleFeatureNotImplemented()}>马上装扮</button>
        </div>

        {/* 主要功能按钮 */}
        <button className={styles.mainButton} onClick={() => handleFeatureNotImplemented()}>
          <Clock className={styles.mainButtonIcon} size={24} />
          <span className={styles.mainButtonText}>记录睡眠</span>
          <span className={styles.mainButtonSubtext}>记录梦话呼噜声</span>
        </button>
      </div>

      {/* 功能按钮区域 */}
      <div className={styles.features}>
        <button className={styles.featureButton} onClick={() => navigate('/sleep/nap')}>
          <div className={styles.featureIconBg}>
            <span className={styles.featureIcon}>😴</span>
          </div>
          <span className={styles.featureText}>小憩</span>
        </button>

        <button className={styles.featureButton} onClick={() => navigate('/sleep/alarm')}>
          <div className={styles.featureIconBg}>
            <Clock className={styles.featureSvgIcon} size={20} />
          </div>
          <span className={styles.featureText}>闹钟与提醒</span>
        </button>

        <button className={styles.featureButton} onClick={() => handleFeatureNotImplemented()}>
          <div className={styles.featureIconBg}>
            <GuideO className={styles.featureSvgIcon} size={20} />
          </div>
          <span className={styles.featureText}>睡前仪式</span>
        </button>
      </div>
    </div>
  );
};
export default Sleep;