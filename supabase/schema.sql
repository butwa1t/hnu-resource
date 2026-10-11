-- ============================================================
-- HNU Resource · 匿名评论初始化脚本（Fuwari 版）
-- 用法：Supabase 控制台 → SQL Editor → 整段粘贴 → Run
-- 可重复运行（会先删除同名策略再重建）
-- ============================================================

create extension if not exists pgcrypto;

-- ---------------- 表：评论 ----------------
-- post_slug 对应文章标识（Fuwari 中为文章 id，如 welcome / xinke-quiz-1）
create table if not exists public.comments (
  id          uuid primary key default gen_random_uuid(),
  post_slug   text not null,
  nickname    text not null default '匿名',
  content     text not null,
  approved    boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ---------------- 启用行级安全 RLS ----------------
alter table public.comments enable row level security;

drop policy if exists "公开读取已通过评论" on public.comments;
drop policy if exists "匿名提交评论"       on public.comments;

-- 任何人只能读取 approved = true 的评论（待审核内容对外不可见）
create policy "公开读取已通过评论"
  on public.comments for select
  to anon, authenticated
  using (approved = true);

-- 任何人可新增评论，但强制 approved = false（无法自行通过审核）
create policy "匿名提交评论"
  on public.comments for insert
  to anon, authenticated
  with check (approved = false);

-- ============================================================
-- 审核操作（SQL Editor 手动执行，或在 Table Editor 里勾选）
-- ============================================================
-- 通过某条评论：
-- update public.comments set approved = true where id = '某条记录的id';
-- 删除垃圾评论：
-- delete from public.comments where id = '某条记录的id';
