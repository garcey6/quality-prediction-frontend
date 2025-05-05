# 间歇过程质量预测系统 - 前端

## 项目简介
这是一个基于Vue 3 + Vite构建的间歇过程质量预测系统前端项目，用于实现工业间歇生产过程的质量预测和可视化分析.

后端项目地址: [quality-prediction-backend](https://github.com/garcey6/quality-prediction-backend.git)

## 技术栈
- 前端框架：Vue 3
- 构建工具：Vite
- UI组件库：Element Plus
- 状态管理：Vuex/Pinia
- 图表库：ECharts
- HTTP客户端：Axios

## 功能特性
- 数据上传与预处理
- 特征选择与参数配置
- 质量预测模型训练
- 预测结果可视化
- 历史数据查询与分析

## 项目结构
src/
├── api/                # API请求封装
├── assets/             # 静态资源
├── components/         # 公共组件
├── router/            # 路由配置
├── store/             # 状态管理
├── utils/             # 工具函数
├── views/             # 页面视图
└── App.vue            # 根组件

## 快速开始
### 安装依赖
npm install

### 开发模式
npm run 

## 环境要求
- Node.js 16+
- npm 8+

## 运行项目
直接在终端输入npm run dev即可，或者在项目根目录下的脚本执行npm run dev。
注意：需要先启动后端服务，确保后端服务正常运行。