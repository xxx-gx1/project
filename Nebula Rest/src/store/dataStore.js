import{
    create
} from 'zustand';

const initData = () => ({
    currentPage: 1,
    isLoading: false,
    error: null
})
export const useDataStore = create((set, get) => ({
  ...initData(),
  // 添加故事相关状态
  stories: [],
  filteredStories: [],

  // 获取故事列表数据
  fetchStories: async (page = 1) => {
    set({ isLoading: true });
    try {
        // 修复API路径和参数传递方式
        const response = await fetch(`/api/stories?page=${page}`);
        const result = await response.json();
        if (result.code === 0) {
            set({
                stories: result.data, // 直接使用data字段
                filteredStories: result.data,
                currentPage: page,
                isLoading: false,
            });
        }
    } catch (err) {
        set({ error: err.message, isLoading: false });
    }
},

  // 加载更多故事
  loadMoreStories: async () => {
    const currentPage = get().currentPage;
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/stories?page=${currentPage + 1}`);
      const result = await response.json();
      if (result.code === 0) {
        set({
          stories: [...get().stories, ...result.data],
          filteredStories: [...get().filteredStories, ...result.data],
          currentPage: currentPage + 1,
          isLoading: false,
        });
      }
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  // 故事搜索过滤
  filterStories: (keyword) => {
    const stories = get().stories;
    if (!keyword.trim()) {
      set({ filteredStories: stories });
    } else {
      const filtered = stories.filter(story => 
        story.title.toLowerCase().includes(keyword.toLowerCase()) || 
        story.desc.toLowerCase().includes(keyword.toLowerCase()) ||
        story.category.toLowerCase().includes(keyword.toLowerCase())
      );
      set({ filteredStories: filtered });
    }
  },

}));