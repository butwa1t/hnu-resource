# HNU Resource

基于 **Fuwari（Astro 博客主题）+ GitHub Pages** 的个人资料展示站。

- 资料与笔记均由**博主本人**整理上传；
- 本站**仅作展示与下载**，访客无需注册登录；
- 无需自建服务器、无需购买域名，push 到 GitHub 即自动部署。

线上地址：<https://butwa1t.github.io/hnu-resource/>

## 一、推送上线

代码已配置好 GitHub Actions 自动部署（`.github/workflows/deploy.yml`），只需推送：

```bash
git push origin main
```

首次需确认仓库 **Settings → Pages → Source** 已选 **GitHub Actions**（部署脚本会自动构建并发布到 Pages）。

## 二、本地运行

```bash
npm install        # 或 pnpm install
npm run dev        # 打开 http://localhost:4321/hnu-resource/
```

## 三、日常更新（GitHub 网页即可，无需本地环境）

**分享一个新资料（两步）**：

1. 把文件放进 `public/resources/`（建议先打包 ZIP）；
2. 在 `src/content/posts/` 新建文件夹，比如 `my-resource/index.md`：

```md
---
title: 资料标题
published: 2026-10-10
description: 一句话简介
tags: [标签1, 标签2]
category: 资料    # 或「笔记」
---

资料说明文字……

[**点此下载：文件名.zip**](/hnu-resource/resources/文件名.zip)
```

提交后自动发布。

**写一篇笔记**：同样在 `src/content/posts/` 下建 `xxx.md`，`category` 填「笔记」即可。

## 四、目录结构

```
├─ .github/workflows/deploy.yml   # GitHub Pages 自动部署
├─ public/resources/              # 你上传的资料文件（可直接下载）
├─ public/avatar.svg              # 侧边栏头像
├─ src/
│  ├─ config.ts                   # 站点名、头像、昵称、简介、导航、主题色
│  ├─ content/posts/              # 你的文章 / 资料（Markdown）
│  └─ pages/                      # 页面
└─ README.md
```

## 五、可选：自定义域名

免费域名 `butwa1t.github.io/hnu-resource/` 已足够；以后购买域名后在
**Settings → Pages → Custom domains** 绑定即可。改用 Cloudflare Pages 根域名时，
把 `astro.config.mjs` 的 `base` 改为 `"/"`。
