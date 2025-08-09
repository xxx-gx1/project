import { 
    useState, 
    useEffect,
} from 'react';
import styles from './timepicker.module.css';

const TimePicker = ({ visible, onConfirm, onCancel, initialTime }) => {
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');

  // 初始化时间
  useEffect(() => {
    if (initialTime) {
      const [h, m] = initialTime.split(':');
      setHours(h);
      setMinutes(m);
    } else {
      // 默认当前时间
      const now = new Date();
      setHours(now.getHours().toString().padStart(2, '0'));
      setMinutes(now.getMinutes().toString().padStart(2, '0'));
    }
  }, [visible, initialTime]);

  if (!visible) return null;

  // 生成数字选择列表
  const generateNumbers = (start, end, step = 1) => {
    return Array.from({ length: (end - start) / step + 1 }, (_, i) => {
      const num = start + i * step;
      return num.toString().padStart(2, '0');
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.pickerContainer}>
        <div className={styles.header}>
          <button className={styles.cancelButton} onClick={onCancel}>取消</button>
          <h3 className={styles.title}>选择时间</h3>
          <button className={styles.confirmButton} onClick={() => onConfirm(`${hours}:${minutes}`)}>确定</button>
        </div>

        <div className={styles.pickerContent}>
          <div className={styles.column}>
            {generateNumbers(0, 23).map(num => (
              <div key={num} className={num === hours ? styles.active : ''} onClick={() => setHours(num)}>
                {num}
              </div>
            ))}
          </div>
          <div className={styles.separator}>:</div>
          <div className={styles.column}>
            {generateNumbers(0, 59, 5).map(num => (
              <div key={num} className={num === minutes ? styles.active : ''} onClick={() => setMinutes(num)}>
                {num}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;