// 防抖函数
export function debounce(fun, delay) {
  return function (args) {
      let that = this
      let _args = args
      clearTimeout(fun.id)
      fun.id = setTimeout(function () {
          fun.call(that, _args)
      }, delay)
  }
}
// 节流函数
export function throttle(fun, delay) {
  let lastTime = 0;
  return function (args) {
    let now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      fun.apply(this, args);
    }
  }
}
// 格式化秒数为 MM:SS 格式
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// 将 MM:SS 格式转换为秒数
export const parseTime = (timeStr) => {
  const [mins, secs] = timeStr.split(':').map(Number);
  return mins * 60 + secs;
};