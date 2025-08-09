# react 星眠 项目
Nebula Rest是一款专注于睡眠健康管理的智能应用，提供科学小盹、高效午休、差旅模式等多场景睡眠解决方案，结合LLM技术实现智能睡眠建议、白噪音生成、睡眠数据分析等功能，帮助用户提升睡眠质量。
## 技术栈
- 前端框架 : React 18
- 状态管理 : Zustand
- 路由管理 : React Router 
- UI组件库 : React-Vant
- HTTP客户端 : Axios
- 构建工具 : Vite
- 样式解决方案 : CSS Modules + PostCSS
- LLM集成 : 支持文本生成、图像生成等功能
- 移动端适配 : lib-flexible + postcss-pxtorem
- 性能优化 : 代码分割、懒加载、图片压缩等

## 项目的架构
- components
- pages
- store
- api
- llm
- hooks
- utils
- mock
## 开发前的准备
- 安装的包
    react-router-dom
    axios
    zustand
    react-vant(UI组件库)
    @react-vant/icons
    mockjs
    lib-flexible
    开发期间的依赖
    vite-plugin-mock
    jwt
    postcss
    postcss-pxtorem
- vite 配置
    - alias
    - mock
    - .env.local
    - llm apiKey
    - user-scalable
## 功能模块
### 1. 睡眠模式管理
- 多模式支持 : 科学小盹、高效午休、差旅模式、完整午休
- 自定义设置 : 支持0-90分钟自定义睡眠时间
- 背景切换 : 不同模式对应不同背景渐变效果
- 唤醒提示 : 计算并显示建议唤醒时间
### 2. 闹钟与提醒
- 自定义闹钟名称、时间、重复周期
- 支持铃声选择与渐强设置
- 睡眠周期智能提醒
### 3. LLM智能功能
- 睡眠咨询 : 基于LLM的睡眠问题解答
- 图像生成 : 生成头像
## 项目亮点和难点
### 1. 科学睡眠方案
基于睡眠周期理论设计的多模式睡眠方案，结合用户习惯智能推荐最优睡眠时间
### 2. 性能优化
- 使用 useCallback 和 useMemo 优化组件渲染
- 实现图片懒加载与资源预加载
- 定时器管理优化，避免内存泄漏
### 3. 沉浸式体验
- 全屏沉浸式睡眠界面
- 背景渐变与呼吸灯效果
- 白噪音与自然音效集成
### 4. LLM深度整合
- 多模态交互（文本/语音/图像）
- 个性化睡眠建议生成

## 项目遇到过什么问题，怎么解决的
### 自定义时间出现NaN怎么办？
已修复输入验证逻辑，确保时间调整在0-90分钟范围内，且输入为有效数字
### 暂停功能失效如何处理？
检查定时器管理逻辑，确保 intervalId 正确清除与重启，可参考 napStore.js 中的 toggleTimer 方法

## 通用组件开发

- Loading

- TimePicker