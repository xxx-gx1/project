import { 
  useState, 
  useEffect,
} from 'react';
import { 
  useParams, 
  useNavigate 
} from 'react-router-dom';
import { 
  useDataStore 
} from '@/store/dataStore';
import Loading from '@/components/Loading';
import { 
  ArrowLeft, 
  ClockO, 
  ShareO 
} from '@react-vant/icons';
import styles from './storyDetail.module.css';
import useTitle from '@/hooks/useTitle';
import { generateAudio } from '@/llm/audio.js'

const StoryDetail = () => {
  const { storyId } = useParams(); // 获取URL中的故事ID
  const navigate = useNavigate();
  const { 
    stories, 
    isLoading, 
  } = useDataStore();
  const [currentStory, setCurrentStory] = useState(null);
  const [audioInstance, setAudioInstance] = useState(null);
  const [audio, setAudio] = useState(null);

  useTitle('故事详情');
  useEffect(() => {
    const fetchAudioUrl = async () => {
      if (!currentStory?.content) return; // 验证内容存在性
      try {
        const audioUrl = await generateAudio(currentStory.content);
        setAudio(audioUrl);
      } catch (e) {
        console.error('音频生成失败:', e);
      }
    };
    fetchAudioUrl();
  }, [currentStory]);

  const playAudio = (e) => {
        if(!audio) alert('音频生成中，请稍后');
        if (audioInstance && !audioInstance.paused) {
            audioInstance.pause();
            setAudioInstance(null);
            return;
        }
        if (audioInstance && audioInstance.paused) {
            audioInstance.play();
            return;
        }
        const audioEle = new Audio(audio);
        setAudioInstance(audioEle);
        audioEle.play();
        audioEle.onended = () => {
            setAudioInstance(null);
        };
    }
  // 根据ID查找故事详情
  useEffect(() => {
    if (stories.length > 0) {
      const foundStory = stories.find(story => story.id.toString() === storyId);
      setCurrentStory(foundStory);
    }
  }, [storyId, stories]);

  if (isLoading || !currentStory) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loading size="40" color="#64b5f6" />
      </div>
    );
  }

  return (
    <div className={styles.detailContainer}>
      {/* 头部导航 */}
      <div className={styles.header}>
        <button onClick={() => navigate('/stories')} className={styles.backButton}>
          <ArrowLeft size={20} />
        </button>
        <div className={styles.headerActions}>
          <button className={styles.actionButton}><ShareO size={20} onClick={() => {
            // 分享逻辑
            alert('分享功能暂未实现');
          }}/></button>
        </div>
      </div>

      {/*故事内容区 */}
      <div className={styles.storyContent}>
        <img 
          src={currentStory.image} 
          alt={currentStory.title} 
          className={styles.storyImage}
        />

        <div className={styles.storyInfo}>
          <h1 className={styles.title}>{currentStory.title}</h1>
          <div className={styles.meta}>
            <span className={styles.category}>{currentStory.category}</span>
            <span className={styles.duration}>
              <ClockO size={14} className={styles.durationIcon} />
              {currentStory.duration}
            </span>
          </div>

          <div className={styles.description}>
            {currentStory.desc}
          </div>

          {/* 故事正文内容 - 假设扩展字段 */}
          <div className={styles.fullContent}>
            <div className={styles.titleWithAudio}>
            <h2>故事正文</h2>
                <div className={styles.playAudio} onClick={playAudio}>
                    <img width="20px" src="https://res.bearbobo.com/resource/upload/Omq2HFs8/playA-3iob5qyckpa.png" alt="logo" />
                </div>
            </div>
            <p>{currentStory.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;
