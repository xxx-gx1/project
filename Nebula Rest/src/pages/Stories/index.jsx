import { 
  useState, 
  useEffect,
  useCallback,
  useRef
} from 'react';
import { 
  useNavigate 
} from 'react-router-dom';
import Loading from '@/components/Loading';
import { 
  Search as SearchIcon,
  ClockO,
  Close
} from '@react-vant/icons';
import { 
  useDataStore 
} from '@/store/dataStore'; // 导入Store
import styles from './stories.module.css';
import { 
  debounce 
} from '@/utils/index';
import useTitle from '@/hooks/useTitle';

const Stories = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const searchRef = useRef(null)
  const sentinelRef = useRef(null);
  useTitle('故事');
  // 从Store获取状态和方法
  const {
    stories, 
    filteredStories, 
    isLoading, 
    fetchStories, 
    loadMoreStories,
    filterStories
  } = useDataStore();

  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      // 当哨兵元素可见且不在加载状态时触发加载更多
      if (entry.isIntersecting && !isLoading) {
        loadMoreStories();
      }
    },
    { threshold: 0.1 }
  );

  const sentinel = sentinelRef.current;
  if (sentinel) {
    observer.observe(sentinel);
  }

  // 组件卸载时停止观察
  return () => {
    if (sentinel) {
      observer.unobserve(sentinel);
    }
  };
}, [isLoading, loadMoreStories]);
  // 初始化数据
  useEffect(() => {
    fetchStories(1);
  }, [fetchStories]);

  const displayStyle = {
      display: searchText ? 'block' : 'none'
    }
  const clearQuery = () => {
      setSearchText('')
      searchRef.current.value = '';
      searchRef.current.focus();
    }
  // 搜索功能 - 调用Store方法
  useEffect(() => {
    filterStories(searchText);
  }, [searchText, filterStories]);

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchText(value);
    }, 300), // 设置300ms防抖延迟
    []
  );
  // 处理搜索输入
  const handleSearch = (value) => {
    setSearchText(value);
  };

  // 跳转到故事详情页
  const goToStoryDetail = (storyId) => {
    navigate(`/stories/${storyId}`);
  };

  if (isLoading && stories.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loading size="40" color="#64b5f6" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* 搜索栏 */}
      <div className={styles.searchContainer}>
        <div className={styles.searchBar}>
          <SearchIcon className={styles.searchIcon} size={18} />
          <input
            type="text"
            placeholder="搜索睡前故事、分类或标签"
            className={styles.searchInput}
            value={searchText}
            ref={searchRef}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Close  onClick={clearQuery} style={displayStyle}/>
        </div>
      </div>

      {/* 故事列表 - 瀑布流 */}
      <div className={styles.storiesContainer}>
        <h2 className={styles.sectionTitle}>推荐故事</h2>
        <div className={styles.waterfall}>
          {filteredStories.length > 0 ? (
            filteredStories.map(story => (
              <div style={{height: story.height}}
                key={story.id} 
                className={styles.storyCard} 
                onClick={() => goToStoryDetail(story.id)}
              >
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className={styles.storyImage}
                />
                <div className={styles.storyContent}>
                  <h3 className={styles.storyTitle}>{story.title}</h3>
                  <p className={styles.storyDesc}>{story.desc}</p>
                  <div className={styles.storyMeta}>
                    <span>
                      <ClockO className={styles.durationIcon} size={12} />
                      {story.duration}
                    </span>
                    <span>{story.category}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '50px 0', gridColumn: '1 / -1' }}>
              没有找到相关故事
            </div>
          )}
        </div>

        {/* 加载更多按钮 */}
        <div ref={sentinelRef} className={styles.sentinel}>
          {isLoading && '加载中...'}  
        </div>
      </div>
    </div>
  );
};

export default Stories;