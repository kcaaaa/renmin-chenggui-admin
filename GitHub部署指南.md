# 🚀 人民城轨2.0运营管理后台 - GitHub Pages 部署指南

## 📋 项目概述

**人民城轨2.0运营管理后台**是一个基于HTML + JavaScript + React + Ant Design构建的现代化B端管理系统，专为城市轨道交通行业设计。

### ✨ 主要功能
- 🎬 **视频审核管理** - AI智能审核 + 人工复审
- 👥 **用户管理** - 多类型用户管理，符合等保三级要求  
- 📊 **用户画像分析** - 深度用户行为分析
- 📈 **行为统计** - AI训练数据采集与分析
- 📺 **直播管理** - 完整的直播生命周期管理
- 💾 **数据管理** - 数据导入导出与备份
- ⚙️ **系统设置** - 系统配置与维护

## 🌐 GitHub Pages 部署方案

### 📁 **项目结构**
```
人民城轨2.0/
├── docs/                    # GitHub Pages 部署目录
│   ├── index.html          # 主应用页面
│   ├── js/                 # JavaScript 文件
│   │   ├── components/     # React 组件
│   │   ├── pages/          # 页面组件
│   │   ├── utils/          # 工具类
│   │   └── App.js         # 主应用
│   └── README.md          # 项目说明
├── GitHub部署指南.md        # 本文件
└── README.md              # 项目根目录说明
```

## 🚀 部署步骤

### **步骤1：准备GitHub仓库**

1. **创建GitHub仓库**
   - 登录 [GitHub](https://github.com)
   - 点击右上角 "+" → "New repository"
   - 仓库名建议：`renmin-chenggui-admin` 或 `metro-management-system`
   - 选择 "Public"（公开仓库才能使用免费的GitHub Pages）
   - 勾选 "Add a README file"
   - 点击 "Create repository"

2. **克隆到本地**（可选）
   ```bash
   git clone https://github.com/你的用户名/仓库名.git
   ```

### **步骤2：上传项目文件**

#### 方法A：Web界面上传（推荐）
1. 在GitHub仓库页面，点击 "uploading an existing file"
2. 将 `docs` 文件夹中的所有文件拖拽到上传区域：
   - `index.html`
   - `js/` 整个文件夹
   - `README.md`
3. 在底部填写提交信息："Initial commit - 人民城轨2.0运营管理后台"
4. 点击 "Commit changes"

#### 方法B：Git命令行
```bash
# 进入项目目录
cd 你的仓库目录

# 复制docs文件夹内容到根目录（或创建docs文件夹）
# 添加所有文件
git add .

# 提交
git commit -m "Initial commit - 人民城轨2.0运营管理后台"

# 推送到GitHub
git push origin main
```

### **步骤3：配置GitHub Pages**

1. **进入仓库设置**
   - 在GitHub仓库页面，点击 "Settings" 标签
   
2. **找到Pages设置**
   - 在左侧菜单中找到 "Pages"
   
3. **配置部署源**
   - **Source**: 选择 "Deploy from a branch"
   - **Branch**: 选择 "main"
   - **Folder**: 选择 "/ (root)" 或 "/docs"（根据您的文件结构）
   
4. **保存设置**
   - 点击 "Save"
   - GitHub会显示部署状态和访问链接

### **步骤4：访问部署的网站**

部署完成后，您的网站将在以下地址可访问：
```
https://你的用户名.github.io/仓库名/
```

例如：`https://zhangsan.github.io/renmin-chenggui-admin/`

## ⚙️ 高级配置

### **自定义域名**（可选）
1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容为您的域名，例如：`admin.yourcompany.com`
3. 在域名DNS设置中添加CNAME记录指向 `你的用户名.github.io`

### **启用HTTPS**
GitHub Pages默认启用HTTPS，无需额外配置。

### **部署优化**
1. **压缩图片**：优化项目中的图片文件大小
2. **CDN加速**：项目已使用CDN资源（React、Ant Design等）
3. **缓存策略**：GitHub Pages会自动处理静态文件缓存

## 🔧 故障排除

### **常见问题**

1. **404错误**
   - 检查文件路径是否正确
   - 确保 `index.html` 在正确位置
   - 等待3-5分钟让部署生效

2. **样式不显示**
   - 检查CSS文件路径
   - 确保所有资源使用相对路径

3. **JavaScript错误**
   - 检查浏览器控制台错误信息
   - 确认CDN资源能正常加载

4. **部署失败**
   - 检查仓库是否为Public
   - 确认Pages设置正确
   - 查看Actions标签页的部署日志

### **调试方法**
1. 在浏览器中按F12打开开发者工具
2. 查看Console标签页的错误信息
3. 检查Network标签页的资源加载情况

## 📊 性能监控

部署成功后，建议：
- 使用Google Analytics监控访问情况
- 定期检查网站加载速度
- 监控用户反馈和错误报告

## 🔄 持续更新

### **更新流程**
1. 修改本地文件
2. 提交到GitHub仓库
3. GitHub Pages会自动重新部署
4. 通常1-2分钟后更新生效

### **版本管理**
- 使用Git标签标记重要版本
- 在README中维护更新日志
- 考虑使用分支管理不同环境

## 📞 技术支持

如需帮助，请：
1. 查看GitHub Pages官方文档
2. 检查项目Issues页面
3. 联系项目维护者

---
**© 2024 人民城轨2.0运营管理系统 | 部署于GitHub Pages** 