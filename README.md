# 时间戳转换器 (Timestamp Converter)

一个基于 React + TypeScript + Vite 的时间戳转换工具。

## 功能特性

- ⏰ 时间戳转日期时间
- 📅 日期时间转时间戳
- 🔢 支持十进制和十六进制格式
- ⚙️ 可自定义基础起始时间（默认为Unix时间戳起点 1970-01-01）
- 🎨 现代化的UI界面，使用 Tailwind CSS

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 部署到 GitHub Pages

### 步骤 1: 创建 GitHub 仓库

1. 在 GitHub 上创建一个新仓库，名称为 `timestamp-converter`
2. 不要初始化 README、.gitignore 或 license

### 步骤 2: 推送代码到 GitHub

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 添加远程仓库（替换 <username> 为你的 GitHub 用户名）
git remote add origin https://github.com/<username>/timestamp-converter.git

# 推送到 main 分支
git branch -M main
git push -u origin main
```

### 步骤 3: 启用 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 **Settings** (设置)
3. 在左侧菜单中点击 **Pages**
4. 在 **Source** 下选择 **GitHub Actions**
5. 等待几分钟，GitHub Actions 会自动构建和部署

### 步骤 4: 访问你的网站

部署完成后，你可以通过以下地址访问：
```
https://<username>.github.io/timestamp-converter/
```

## 技术栈

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (图标)

## License

MIT
