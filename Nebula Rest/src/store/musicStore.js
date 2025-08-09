import { create } from 'zustand';

const useMusicStore = create((set, get) => ({
  // 歌曲列表
  songs: [
    { id: 'rain', title: '轻柔雨声', subtitle: '大自然的声音', duration: '03:45' },
    { id: 'wave', title: '轻柔海浪', subtitle: '海洋的呼吸', duration: '20:00' },
    { id: 'fire', title: '温暖篝火', subtitle: '冬日的慰藉', duration: '30:00' },
    { id: 'wind', title: '山间清风', subtitle: '山谷的私语', duration: '25:00' },
    { id: 'rainforest', title: '热带雨林', subtitle: '生命的交响', duration: '40:00' },
    { id: 'waterfall', title: '瀑布流水', subtitle: '自然的力量', duration: '35:00' },
    { id: 'birds', title: '晨间鸟鸣', subtitle: '唤醒的序曲', duration: '15:00' },
  ],
  // 播放状态
  currentSongIndex: 0,
  isPlaying: false,
  progress: 0,
  currentTime: '00:00',

  // 播放控制方法
  setCurrentSongIndex: (index) => set({ currentSongIndex: index }),
  togglePlay: () => set(state => ({ isPlaying: !state.isPlaying })),
  setProgress: (progress) => set({ progress }),
  setCurrentTime: (time) => set({ currentTime: time }),

  // 歌曲切换方法
  prevSong: () => set(state => ({
    currentSongIndex: (state.currentSongIndex - 1 + state.songs.length) % state.songs.length,
    progress: 0,
    currentTime: '00:00'
  })),
  nextSong: () => set(state => ({
    currentSongIndex: (state.currentSongIndex + 1) % state.songs.length,
    progress: 0,
    currentTime: '00:00'
  })),
}));

export default useMusicStore;