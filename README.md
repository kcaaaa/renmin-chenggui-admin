# 人民城轨2.0运营管理后台

一个现代化的城市轨道交通运营管理系统，提供完整的内容管理、展会管理、运营分析等功能。

## 🚀 在线演示

- **GitHub Pages**: https://kcaaaa.github.io/renmin-chenggui-admin/
- **演示账号**: 
  - 用户名：`admin`
  - 密码：`admin123`

## 📋 功能特性

### 1. 内容管理
- **内容发布**：支持图文、视频、资讯等多种内容类型
- **内容列表**：统一管理所有发布内容
- **标签管理**：灵活的内容标签体系

### 2. 审核管理
- **AI审核**：智能内容审核
- **审批流程**：多级审批机制
- **作品审批**：内容发布审核
- **展商审批**：展商信息审核

### 3. 展会管理（核心模块）
- **展会管理**：展会信息维护
- **报名管理**：参展报名处理
- **场馆信息**：展馆布局管理
- **展商详情**：展商信息查询
- **会议活动**：活动日程安排
- **展商信息管理**：
  - 展商基础信息
  - 产品信息
  - 展商活动信息
  - 商务配对

### 4. 运营管理
- **运营数据统计**：
  - 用户分析
  - APP行为统计
  - 功能使用分析
  - 异常情况统计
- **用户行为统计**：
  - 数据概览
  - 基础行为统计
  - 深度行为统计
- **系统反馈列表**

### 5. 系统管理
- **用户管理**：用户账号管理
- **组织结构**：组织架构维护
- **角色管理**：权限角色配置
- **日志管理**：
  - 用户操作日志
  - 登录登出日志
  - 作品发布日志
  - 审批日志
- **AI管理**：智能体配置
- **菜单管理**：动态菜单配置
- **个人中心**：个人信息维护

## 🛠️ 技术栈

- **前端框架**：React 17.0.2
- **UI组件库**：Ant Design 4.24.15
- **图表库**：ECharts 5.4.3
- **开发语言**：纯JavaScript（无需构建工具）
- **本地服务器**：Python HTTP Server

## 📦 项目结构

```
人民城轨后台原型/
├── index.html              # 开发环境入口
├── docs/                   # GitHub Pages部署目录
│   ├── index.html         # 生产环境入口
│   ├── js/                # JavaScript文件
│   │   ├── components/    # 通用组件
│   │   ├── pages/         # 页面组件
│   │   └── utils/         # 工具函数
│   └── css/               # 样式文件
├── js/                     # 开发环境JS文件
├── css/                    # 开发环境CSS文件
└── README.md              # 项目说明文档
```

## 🚀 快速开始

### 本地开发

1. **克隆项目**
```bash
git clone https://github.com/kcaaaa/renmin-chenggui-admin.git
cd renmin-chenggui-admin
```

2. **启动本地服务器**
```bash
# Python 3
python -m http.server 8081

# 或 Python 2
python -m SimpleHTTPServer 8081
```

3. **访问系统**
打开浏览器访问：http://localhost:8081

### GitHub Pages部署

1. **Fork本项目**

2. **启用GitHub Pages**
- 进入Settings → Pages
- Source选择：Deploy from a branch
- Branch选择：main
- Folder选择：/docs
- 点击Save

3. **访问部署的系统**
- 地址格式：`https://[你的用户名].github.io/renmin-chenggui-admin/`

## 🔧 配置说明

### 修改登录凭据
编辑 `js/utils/auth.js` 文件中的默认账号密码：

```javascript
const MOCK_USERS = [
    {
        username: 'admin',
        password: 'admin123',
        // ...
    }
];
```

### 自定义菜单
编辑 `js/components/Navigation.js` 文件中的 `menuItems` 数组。

## 📱 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

## 📄 许可证

本项目采用 MIT 许可证。

## 👥 联系方式

如有问题或建议，请通过以下方式联系：

- 提交Issue：https://github.com/kcaaaa/renmin-chenggui-admin/issues
- 邮箱：[您的邮箱]

---

⭐ 如果这个项目对您有帮助，请给个Star支持一下！ 