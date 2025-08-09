import { 
    create 
} from 'zustand';
import { persist } from 'zustand/middleware';

export const useAlarmStore = create(
  persist(
    (set, get) => ({
      alarms: [
        { id: 1, name: '自定义闹钟', time: '07:00', repeat: '每天', enabled: false },
        { id: 2, name: '就寝提醒', time: '23:00', repeat: '每天', enabled: false },
        { id: 3, name: '小憩提醒', time: '13:00', repeat: '每天', enabled: false },
      ],

      // 添加新闹钟
      addAlarm: (alarm) => set((state) => ({
        alarms: [...state.alarms, { id: Date.now(), enabled: true, ...alarm }]
      })),

      // 切换闹钟状态
      toggleAlarm: (id) => set((state) => ({
        alarms: state.alarms.map(alarm => 
          alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
        )
      })),

      // 删除闹钟
      deleteAlarm: (id) => set((state) => ({
        alarms: state.alarms.filter(alarm => alarm.id !== id)
      })),

      // 更新闹钟
      updateAlarm: (updatedAlarm) => set((state) => ({
        alarms: state.alarms.map(alarm => 
          alarm.id === updatedAlarm.id ? { ...alarm, ...updatedAlarm } : alarm
        )
      }))
    }),
    {
      name: 'alarm-storage', // 本地存储键名
      getStorage: () => localStorage, // 使用localStorage
    }
  )
);