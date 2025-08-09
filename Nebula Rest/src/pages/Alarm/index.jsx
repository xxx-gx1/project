import { 
  useState,
  useCallback,
  memo
} from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, 
    Delete 
} from '@react-vant/icons';
import { useAlarmStore } from '@/store/alarmStore';
import TimePicker from '@/components/TimePicker';
import styles from './alarm.module.css';

const MemoizedTimePicker = memo(TimePicker);
const Alarm = () => {
  const navigate = useNavigate();
  const {
    alarms,
    toggleAlarm,
    addAlarm,
    deleteAlarm,
    updateAlarm
  } = useAlarmStore();
  const [pickerVisible, setPickerVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
 const [newAlarm, setNewAlarm] = useState({
    name: '', // 闹钟名称
    notes: '', // 新增备注字段
    time: '07:00',
    repeat: '每天',
    enabled: true
  });
  const [validationError, setValidationError] = useState('');
  // 打开表单
  const openForm = () => {
    setIsFormVisible(true);
    setValidationError('');
  };

  // 关闭表单
  const closeForm = () => {
    setIsFormVisible(false);
  };

  // 验证表单
  const validateForm = () => {
    if (!newAlarm.name.trim()) {
      setValidationError('请输入闹钟名称');
      return false;
    }
    if (!newAlarm.time) {
      setValidationError('请选择闹钟时间');
      return false;
    }
    return true;
  };

  // 保存新闹钟
  const saveNewAlarm = useCallback(() => {  

    if (!validateForm()) return;

    addAlarm({
      ...newAlarm,
      id: Date.now().toString() // 生成唯一ID
    });

    // 重置表单并关闭
    setNewAlarm({
      name: '',
      notes: '',
      time: '07:00',
      repeat: '每天',
      enabled: true
    });
    closeForm();

  }, [newAlarm]);

  // 打开时间选择器
  const openTimePicker = () => {
    setPickerVisible(true);
  };

  // 确认选择时间
  const handleTimeConfirm = useCallback((time) => {
    setNewAlarm({ ...newAlarm, time });
    setPickerVisible(false);
  }, [newAlarm]);


  return (
    <div className={styles.container}>
      {/* 顶部导航 */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate('/sleep')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className={styles.title}>闹钟与提醒</h1>
      </div>

      {/* 闹钟列表 */}
      <div className={styles.alarmList}>
        {alarms.map(alarm => (
          <div key={alarm.id} className={styles.alarmItem}>
            <div className={styles.alarmInfo}>
              <h3 className={styles.alarmName}>{alarm.name}</h3>
              <div className={styles.alarmDetails}>
                <span className={styles.alarmTime}>{alarm.time}</span>
                <span className={styles.alarmRepeat}>{alarm.repeat}</span>
              </div>
              <button className={styles.toneButton}>搭配铃声/唤醒</button>
            </div>
            <div className={styles.alarmActions}>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={alarm.enabled}
                  onChange={() => toggleAlarm(alarm.id)}
                />
                <span className={styles.slider}></span>
              </label>
              <button className={styles.deleteButton} onClick={() => deleteAlarm(alarm.id)}>
                <Delete size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 添加闹钟按钮 */}
      <button className={styles.addButton} onClick={openForm}>
        +
      </button>

      {/* 闹钟添加表单 */}
      {isFormVisible && (
        <div className={styles.formOverlay}>
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>添加新闹钟</h2>
              <button className={styles.closeButton} onClick={closeForm}>
                ×
              </button>
            </div>

            {validationError && (
              <div className={styles.errorMessage}>{validationError}</div>
            )}

            <div className={styles.formContent}>
              {/* 闹钟名称 */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>闹钟名称 *</label>
                <input
                  type="text"
                  value={newAlarm.name}
                  onChange={(e) => setNewAlarm({...newAlarm, name: e.target.value})}
                  className={styles.formInput}
                  placeholder="请输入闹钟名称"
                />
              </div>

              {/* 备注字段 */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>备注</label>
                <textarea
                  value={newAlarm.notes}
                  onChange={(e) => setNewAlarm({...newAlarm, notes: e.target.value})}
                  className={styles.formTextarea}
                  placeholder="请输入备注信息（选填）"
                  rows={3}
                />
              </div>

              {/* 时间选择 */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>闹钟时间 *</label>
                <input
                  type="text"
                  value={newAlarm.time}
                  onClick={() => setPickerVisible(true)}
                  readOnly
                  className={styles.timeInput}
                  placeholder="点击选择时间"
                />
              </div>
              {/* 重复设置 */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>重复</label>
                <select
                  value={newAlarm.repeat}
                  onChange={(e) => setNewAlarm({...newAlarm, repeat: e.target.value})}
                  className={styles.formSelect}
                >
                  <option value="每天">每天</option>
                  <option value="工作日">工作日 (周一至周五)</option>
                  <option value="周末">周末 (周六至周日)</option>
                  <option value="自定义">自定义</option>
                </select>
              </div>
            </div>

            <div className={styles.formFooter}>
              <button className={styles.cancelButton} onClick={closeForm}>取消</button>
              <button className={styles.confirmButton} onClick={saveNewAlarm}>保存</button>
            </div>
          </div>
                {/* 时间选择器 */}
            <MemoizedTimePicker
                visible={pickerVisible}
                onConfirm={handleTimeConfirm}
                onCancel={() => setPickerVisible(false)}
            />
        </div>
      )}
    </div>
  );
};

export default Alarm;