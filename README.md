# Image Background Remover 🖼️➡️🎨

> 基于 Cloudflare Pages + Workers 的在线AI图片背景移除工具

## ✨ 特性
- ⚡ **快速处理**：3秒内完成背景移除
- 🆓 **完全免费**：无需注册，无使用限制
- 🌐 **全球加速**：基于Cloudflare边缘网络
- 📱 **响应式设计**：支持所有设备访问
- 🔒 **隐私保护**：图片只在内存中处理，不存储任何数据

## 🚀 技术架构

```
前端 (Cloudflare Pages)          用户界面
      ↓ HTTP
API (Cloudflare Workers)        业务逻辑
      ↓ HTTP
Remove.bg API                    AI背景移除
```

## 📁 项目结构

```
image-background-remover/
├── frontend/                    # React前端应用
│   ├── src/
│   │   ├── components/         # React组件
│   │   ├── utils/             # 工具函数
│   │   └── styles/            # 样式文件
│   ├── public/                # 静态资源
│   └── package.json           # 前端依赖
├── backend/                    # Cloudflare Workers
│   ├── src/
│   │   └── index.js          # Worker主文件
│   └── package.json          # Worker依赖
├── docs/                      # 文档
└── .github/workflows/        # GitHub Actions
```

## 🔧 快速开始

### 1. 本地开发
```bash
# 克隆项目
git clone https://github.com/Kevin-WangXing/image-background-remover.git
cd image-background-remover

# 安装前端依赖
cd frontend
npm install
npm run dev

# 安装后端依赖
cd ../backend
npm install
npm run dev
```

### 2. 部署到Cloudflare

#### 前端部署 (Cloudflare Pages)
```bash
cd frontend
npm run build
# 在Cloudflare Pages控制台上传dist目录
```

#### 后端部署 (Cloudflare Workers)
```bash
cd backend
npm run deploy
```

### 3. 环境变量配置

**前端环境变量** (.env.local):
```env
VITE_API_URL=https://your-worker.your-account.workers.dev
```

**后端环境变量** (wrangler.toml):
```toml
name = "image-background-remover-worker"
compatibility_date = "2024-01-01"

[vars]
REMOVE_BG_API_KEY = "your_remove_bg_api_key"
```

## 📖 使用方法

### 作为用户
1. 访问网站
2. 拖拽或选择图片上传
3. 等待AI处理（3-10秒）
4. 下载透明背景PNG图片

### 作为开发者
```javascript
// API调用示例
async function removeBackground(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await fetch('/api/remove-bg', {
    method: 'POST',
    body: formData
  });
  
  return await response.blob();
}
```

## 🔗 API接口

### POST `/api/remove-bg`
移除图片背景

**请求**:
- Content-Type: `multipart/form-data`
- 参数: `image` (图片文件)

**响应**:
- 成功: `200 OK`，返回PNG图片
- 失败: `4xx/5xx`，返回错误信息

## 📊 性能指标
- 页面加载时间: < 2秒
- 图片处理时间: < 10秒
- 并发处理: 支持多用户同时使用
- 可用性: 99.9%

## 🤝 贡献指南

1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢
- [Remove.bg](https://www.remove.bg/) - 提供优秀的AI背景移除API
- [Cloudflare](https://www.cloudflare.com/) - 提供强大的边缘计算平台
- [React](https://reactjs.org/) - 优秀的前端框架
- [Vite](https://vitejs.dev/) - 快速的前端构建工具

## 📞 联系方式
如有问题或建议，请提交 [Issue](https://github.com/Kevin-WangXing/image-background-remover/issues)

---
⭐ **如果这个项目对你有帮助，请给它一个Star！** ⭐