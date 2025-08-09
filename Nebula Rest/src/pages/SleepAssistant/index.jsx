import { useEffect, useState, useRef } from 'react';
import { Button, Input, Loading, Toast } from 'react-vant';
import { ChatO, UserO, Chat, StarO } from '@react-vant/icons';
import styles from './sleepassistant.module.css';
import useTitle from '@/hooks/useTitle';
import { chat } from '@/llm/chat.js'
import { generateAudio } from '@/llm/audio.js'

const SleepAssistant = () => {
    useTitle('睡眠助手')
    const [text, setText] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [audio, setAudio] = useState('');
    const [audioInstance, setAudioInstance] = useState(null);
    const [messages, setMessages] = useState([
    {
      id: 1,
      content: '你好！我是星眠AI助手✨，我可以帮你解决睡眠问题、提供放松技巧、生成睡前故事或分析睡眠数据。',
      role: 'assistant'
    }
  ]);
  
  // 滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const messagesEndRef = useRef(null);
  

  const handleChat = async () => {
        if (text.trim() === "") {
            return
        }
        setIsSending(true)
        setText("")
        setMessages((prev) => {
            return [
                ...prev,
                {
                    role: 'user',
                    content: text
                }
            ]
        })
        const newMessage = await chat([
            {
                role: 'user',
                content: text
            }
        ]);
        console.log(newMessage)
        const audioUrl = await generateAudio(newMessage.data.content);
        setAudio(audioUrl);
        setMessages((prev) => {
            return [
                ...prev,
                newMessage.data
            ]
        })
        setIsSending(false)
    }
    const playAudio = (e) => {
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <StarO className={styles.starIcon} />
          <h1 className={styles.title}>星眠AI助手</h1>
          <div className={styles.subtitle}>您的专属睡眠顾问</div>
        </div>
      </div>
      
      <div className={styles.chatArea}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.role === 'user' ? styles.userMessage : styles.assistantMessage
            }`}
          >
            <div className={styles.avatar}>
              {msg.role === 'assistant' ? <ChatO /> : <UserO />}
            </div>
            <div className={styles.messageContent}>
              {msg.content.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              {msg.role === 'assistant' && audio && (
                <div className="playAudio" onClick={playAudio}>
                    <img width="20px" src="https://res.bearbobo.com/resource/upload/Omq2HFs8/playA-3iob5qyckpa.png" alt="logo" />
                </div>
            )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        
        {isSending && (
          <div className={styles.thinking}>
            <div className={styles.thinkingDots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span>思考中...</span>
          </div>
        )}
      </div>
      
      <div className={styles.quickActions}>
        <Input
          value={text}
          onChange={setText}
          placeholder="咨询睡眠问题..."
          className={styles.input}
        />
        <Button 
          type="primary" 
          className={styles.sendButton}
          onClick={handleChat}
          disabled={isSending}
        >
          发送
        </Button>
      </div>
    </div>
  );
};

export default SleepAssistant;
