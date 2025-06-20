# 🚇 人民城轨2.0运营管理后台

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-部署就绪-brightgreen)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-2.0.1-orange.svg)](CHANGELOG.md)

> 专业的城市轨道交通行业B端管理系统，支持视频审核、用户管理、数据分析等核心功能

## 📋 项目简介

人民城轨2.0运营管理后台是一个现代化的企业级管理系统，专为城市轨道交通行业设计。系统采用前端技术栈构建，提供完整的内容审核、用户管理、数据分析和直播管理功能。

### ✨ 核心特性

- 🎬 **智能视频审核** - AI + 人工双重审核机制
- 👥 **等保三级用户管理** - 符合国家信息安全等级保护要求
- 📊 **深度用户画像** - 多维度用户行为分析
- 📈 **AI训练数据统计** - 为机器学习提供高质量数据
- 📺 **全生命周期直播管理** - 创建、监控、回放一体化
- 💾 **企业级数据管理** - 导入导出、备份恢复
- ⚙️ **灵活系统配置** - 可定制的管理选项

### 🛠️ 技术栈

- **前端框架**: React 17.x
- **UI组件库**: Ant Design 4.x  
- **图表库**: ECharts 5.x
- **构建工具**: 原生 HTML + JavaScript
- **样式方案**: CSS3 + CSS Variables
- **部署平台**: GitHub Pages

## 🚀 快速开始

### 本地开发

1. **克隆仓库**
   ```bash
   git clone https://github.com/你的用户名/renmin-chenggui-admin.git
   cd renmin-chenggui-admin
   ```

2. **启动本地服务器**
   ```bash
   # 使用Python
   python -m http.server 8080
   
   # 或使用Node.js
   npx http-server -p 8080
   ```

3. **访问应用**
   ```
   http://localhost:8080
   ```

### GitHub Pages 部署

详细部署指南请查看 [GitHub部署指南.md](GitHub部署指南.md)

## 📁 项目结构

```
人民城轨2.0/
├── docs/                    # 部署文件夹
│   ├── index.html          # 主应用入口
│   ├── js/                 # JavaScript 源码
│   │   ├── components/     # React 组件
│   │   ├── pages/          # 页面组件  
│   │   ├── utils/          # 工具函数
│   │   └── App.js         # 应用入口
│   └── README.md          # 项目说明
├── GitHub部署指南.md        # 部署文档
└── README.md              # 项目概述（本文件）
```

## 📖 功能模块

### 🎬 视频审核管理
- AI智能审核（画面、音频、字幕检测）
- 多级人工复审流程
- 风险等级评估与标记
- 审核历史追踪

### 👥 用户管理
- 五种用户类型支持
- 三权分立安全架构
- 双因子身份认证
- 细粒度权限控制

### 📊 用户画像分析
- 实时用户统计
- 行业与企业规模识别
- 行为标签智能分析
- 用户分群管理

### 📈 行为统计
- 高精度数据采集（99.5%准确率）
- 实时行为监控
- AI训练数据导出
- 深度用户路径分析

### 📺 直播管理  
- 完整直播创建流程
- 实时评论管理
- 图片直播支持
- 回放生成与管理

## 🔧 系统要求

### 浏览器支持
- Chrome 80+ ✅
- Firefox 75+ ✅  
- Safari 13+ ✅
- Edge 80+ ✅

### 性能指标
- 首屏加载时间 < 3秒
- 交互响应时间 < 100ms
- 数据准确率 > 99.5%
- 系统可用性 > 99.9%

## 🤝 贡献指南

我们欢迎社区贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何参与项目开发。

### 开发流程
1. Fork 项目
2. 创建功能分支
3. 提交代码变更
4. 发起 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系我们

- 📧 邮箱: admin@renmin-chenggui.com
- 💬 问题反馈: [GitHub Issues](https://github.com/你的用户名/renmin-chenggui-admin/issues)
- 📖 文档wiki: [项目Wiki](https://github.com/你的用户名/renmin-chenggui-admin/wiki)

## 🎯 路线图

- [ ] v2.1.0 - 移动端响应式适配
- [ ] v2.2.0 - 国际化多语言支持  
- [ ] v2.3.0 - 深度主题定制
- [ ] v3.0.0 - 微前端架构重构

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给个星标支持 ⭐**

Made with ❤️ by 人民城轨开发团队

</div> 