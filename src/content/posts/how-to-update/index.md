---
title: 如何自由地更新这个博客
published: 2026-10-10
description: 不用本地装环境，在 GitHub 网页上写 Markdown 就能自动发布。
tags: [教程, 博客]
category: 笔记
---

更新博客不需要在自己电脑装任何东西，直接在 GitHub 上操作即可。

## 发一篇新内容

1. 打开仓库里的 `src/content/posts/` 目录；
2. 点 **Add file → Create new file**；
3. 若只是一篇文章，文件名以 `.md` 结尾（如 `data-note.md`）；若还要带附件，就新建一个文件夹，在里面建 `index.md` 并上传附件；
4. 顶部按下面格式写「头部信息」，下面是正文：

```md
---
title: 标题
published: 2026-10-10
description: 一句话摘要（可选）
tags: [标签1, 标签2]
category: 资料   # 或「笔记」
---

正文从这里开始，支持 Markdown。
```

5. 点 **Commit changes** 保存，GitHub Actions 会在一两分钟内自动构建发布。

## 修改 / 删除

在 `src/content/posts/` 点开对应文件，点右上角铅笔图标编辑，或直接删除，提交后自动生效。
