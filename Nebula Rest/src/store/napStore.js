import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 定义不同模式的配置
const MODE_CONFIGS = {
  custom: { minutes: 15, gradient: 'linear-gradient(135deg, #8A9FD1, #6B7CB5)' },
  science: { minutes: 10, gradient: 'linear-gradient(135deg, #FFB6C1, #FF69B4)' },
  efficient: { minutes: 24, gradient: 'linear-gradient(135deg, #90EE90, #32CD32)' },
  travel: { minutes: 40, gradient: 'linear-gradient(135deg, #FFFACD, #FFD700)' },
  full: { minutes: 90, gradient: 'linear-gradient(135deg, #E0FFFF, #00CED1)' }
};

export const useNapStore = create(
  persist(
    (set, get) => ({
      // 状态
      mode: 'science', // 默认模式
      customMinutes: 15, // 自定义模式时间
      remainingTime: MODE_CONFIGS.science.minutes * 60,
      isActive: false,
      wakeUpTime: null,
      timerId: null,

      // 方法
      setMode: (newMode) => set(state => {
        // 修复：切换模式时更新剩余时间
        let newRemainingTime = state.remainingTime;
        if (state.intervalId) {
          clearInterval(state.intervalId);
        }
        if (newMode !== 'custom') {
          const modeMinutes = newMode === 'science' ? 10 :
                             newMode === 'efficient' ? 24 :
                             newMode === 'travel' ? 40 : 90;
            newRemainingTime = modeMinutes * 60;
        } else {
            newRemainingTime = state.customMinutes * 60;
        }
    return {
        ...state,
      mode: newMode,
      remainingTime: newRemainingTime,
      isActive: false,
      intervalId: null 
    };
    }),

      setCustomMinutes: (minutes) => {
        const numMinutes = Number(minutes);
        if (isNaN(numMinutes)) return;
        // 添加0-90分钟范围限制
        const clampedMinutes = Math.max(0, Math.min(90, numMinutes));
        set(state => ({
            customMinutes: clampedMinutes,
            remainingTime: clampedMinutes * 60,
        }));
        },

      toggleTimer: () => {
        const { isActive, remainingTime, setWakeUpTime, timerId } = get();

        if (isActive) {
          // 暂停定时器
          clearInterval(timerId);
          set({ isActive: false, timerId: null });
        } else {
          // 开始定时器
          if (remainingTime <= 0) {
            // 如果时间已结束，重置为当前模式时间
            const config = MODE_CONFIGS[get().mode];
            set({
              remainingTime: get().mode === 'custom' ? get().customMinutes * 60 : config.minutes * 60
            });
          }
          setWakeUpTime();
          const newTimerId = setInterval(() => {
            set((state) => {
              if (state.remainingTime <= 1) {
                clearInterval(newTimerId);
                return {
                  remainingTime: 0,
                  isActive: false,
                  timerId: null
                };
              }
              return { remainingTime: state.remainingTime - 1 };
            });
          }, 1000);
          set({ isActive: true, timerId: newTimerId });
        }
      },

      setWakeUpTime: () => {
        const now = new Date();
        const wakeUp = new Date(now.getTime() + get().remainingTime * 1000);
        set({
          wakeUpTime: wakeUp
        });
      },

      // 获取当前模式的渐变背景
      getCurrentGradient: () => {
        return MODE_CONFIGS[get().mode].gradient;
      },

      // 格式化剩余时间为分:秒
      formatTime: () => {
        const seconds = get().remainingTime;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
      },

      // 格式化唤醒时间
      formatWakeUpTime: () => {
        const wakeUpTime = get().wakeUpTime;
        if (!wakeUpTime) return '';
        return `${wakeUpTime.getHours().toString().padStart(2, '0')}:${wakeUpTime.getMinutes().toString().padStart(2, '0')}`;
      }
    }),
    {
      name: 'nap-storage',
      partialize: (state) => ({ mode: state.mode, customMinutes: state.customMinutes })
    }
  )
);