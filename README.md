# HNU Resource

基于 **Fuwari（Astro 博客主题）+ Supabase + GitHub Pages** 的个人资料分享站。

- 资料与笔记均由**博主本人**整理上传；
- 访客**不能投稿或上传文件**，只能在每篇内容下方**匿名留言、提建议**；
- 评论**审核通过后才公开**；
- 无需自建服务器、无需购买域名，push 到 GitHub 即自动部署。

线上地址：<https://butwa1t.github.io/hnu-resource/>

## 一、首次搭建（约 10 分钟）

### 1. 创建 Supabase 项目（免费，仅用于评论）

1. 打开 <https://supabase.com>，用 GitHub 账号登录，点 **New project**；
2. 左侧进入 **SQL Editor**；
3. 把本仓库 [`supabase/schema.sql`](supabase/schema.sql) 整段粘贴进去，点 **Run**，建好评论表和安全规则。

### 2. 获取密钥

进入 **Project Settings → API**，复制：

- `Project URL`，形如 `https://xxxxxxxx.supabase.co`
- `Project API keys` 里的 **anon / public** key

> anon key 设计上就是公开的（配合 RLS 安全）。**不要**使用 `service_role` key。

### 3. 配置到 GitHub 仓库

仓库 **Settings → Secrets and variables → Actions → Variables** 中，点 **New repository variable** 添加：

| Name | Value |
|---|---|
| `PUBLIC_SUPABASE_URL` | Project URL |
| `PUBLIC_SUPABASE_ANON_KEY` | anon key |

### 4. 开启 GitHub Pages

仓库 **Settings → Pages**，把 **Source** 选择为 **GitHub Actions**（不要选分支）。

### 5. 推送代码

```bash
git add .
git commit -m "feat: fuwari blog with supabase comments"
git push origin main
```

Actions 自动构建部署，完成后访问线上地址。

## 二、本地运行

```bash
npm install            # 或 pnpm install
cp .env.example .env   # 填入 Supabase 的 URL 和 anon key
npm run dev            # 打开 http://localhost:4321/hnu-resource/
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

提交后自动发布，评论区自动出现在页面底部。

**写一篇笔记**：同样在 `src/content/posts/` 下建 `xxx.md`，`category` 填「笔记」即可。

**审核评论**：Supabase 控制台 **Table Editor → comments** 表，把对应记录 `approved` 勾为 `true`；或执行
`update public.comments set approved = true where id = '记录id';`

## 四、目录结构

```
fuwari/
├─ .github/workflows/deploy.yml   # GitHub Pages 自动部署（含 Supabase 密钥注入）
├─ public/resources/              # 你上传的资料文件（可直接下载）
├─ public/avatar.svg              # 侧边栏头像
├─ src/
│  ├─ config.ts                   # 站点名、头像、昵称、简介、导航、主题色
│  ├─ components/widget/SupabaseComments.svelte  # 匿名评论组件
│  ├─ content/posts/              # 你的文章 / 资料（Markdown）
│  └─ pages/                      # 页面
└─ supabase/schema.sql            # 评论表初始化脚本
```

## 五、可选：自定义域名

免费域名 `butwa1t.github.io/hnu-resource/` 已足够；以后购买域名后在
**Settings → Pages → Custom domains** 绑定即可。改用 Cloudflare Pages 根域名时，
把 `astro.config.mjs` 的 `base` 改为 `"/"`。
