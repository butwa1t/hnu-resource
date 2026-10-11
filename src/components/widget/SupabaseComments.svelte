<script lang="ts">
	import { createClient } from "@supabase/supabase-js";

	export let thread = "";

	const url = import.meta.env.PUBLIC_SUPABASE_URL;
	const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
	const enabled = Boolean(url && anonKey);

	const sb = enabled
		? createClient(url, anonKey, {
				auth: { persistSession: false, autoRefreshToken: false },
			})
		: null;

	let rows: Array<{ nickname: string; content: string; created_at: string }> = [];
	let loading = true;
	let loadError = "";
	let nick = "";
	let content = "";
	let status = "";
	let busy = false;

	async function load() {
		if (!sb) {
			loading = false;
			return;
		}
		const { data, error } = await sb
			.from("comments")
			.select("nickname,content,created_at")
			.eq("post_slug", thread)
			.order("created_at", { ascending: true });
		loading = false;
		if (error) loadError = error.message;
		else rows = data || [];
	}
	load();

	async function submit() {
		const text = content.trim();
		if (!text) {
			status = "请填写评论内容。";
			return;
		}
		busy = true;
		status = "";
		const { error } = await sb!.from("comments").insert([
			{
				post_slug: thread,
				nickname: nick.trim() || "匿名",
				content: text,
				approved: false,
			},
		]);
		busy = false;
		if (error) status = "提交失败：" + error.message;
		else {
			content = "";
			status = "已提交，审核通过后将公开展示。";
		}
	}

	function fmt(t: string) {
		return new Date(t).toLocaleString("zh-CN", {
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	}
</script>

<section class="comments">
	<div class="title">评论</div>

	{#if !enabled}
		<p class="muted">评论功能需要先配置 Supabase（见 README）。</p>
	{:else if loading}
		<p class="muted">正在加载评论…</p>
	{:else if loadError}
		<p class="err">评论加载失败：{loadError}</p>
	{:else if rows.length === 0}
		<p class="muted">还没有评论，来抢沙发。</p>
	{:else}
		{#each rows as r (r.created_at + r.nickname)}
			<div class="comment-item">
				<p class="comment-head">
					<strong>{r.nickname || "匿名"}</strong>
					<span class="muted"> · {fmt(r.created_at)}</span>
				</p>
				<p class="comment-body">{r.content}</p>
			</div>
		{/each}
	{/if}

	{#if enabled}
		<form class="comment-form" onsubmit={(e) => { e.preventDefault(); submit(); }}>
			<input bind:value={nick} maxlength="20" placeholder='昵称（可留空，默认“匿名”）' />
			<textarea
				bind:value={content}
				rows="3"
				maxlength="1000"
				required
				placeholder="友善发言，评论经审核后公开…"
			></textarea>
			<button type="submit" disabled={busy}>{busy ? "提交中…" : "发表评论"}</button>
			{#if status}<p class="form-msg">{status}</p>{/if}
		</form>
	{/if}
</section>

<style>
	.comments {
		margin-top: 1.5rem;
	}
	.title {
		font-weight: 700;
		font-size: 1.25rem;
		margin-bottom: 0.75rem;
	}
	.muted {
		color: var(--color-black-50, #777);
		opacity: 0.7;
	}
	.err {
		color: #b91c1c;
	}
	.comment-item {
		border: 1px solid var(--line-divider);
		border-radius: 0.75rem;
		padding: 0.6rem 1rem;
		margin: 0.6rem 0;
	}
	.comment-head {
		margin: 0 0 0.15rem;
		font-size: 0.9rem;
	}
	.comment-body {
		margin: 0;
		white-space: pre-wrap;
		word-break: break-word;
	}
	.comment-form {
		margin-top: 1rem;
	}
	input,
	textarea {
		width: 100%;
		padding: 0.55rem 0.75rem;
		border: 1px solid var(--line-divider);
		border-radius: 0.6rem;
		margin: 0.4rem 0;
		font-family: inherit;
		font-size: 0.95rem;
		background: transparent;
		color: inherit;
	}
	textarea {
		resize: vertical;
	}
	button {
		background: var(--primary);
		color: #fff;
		border: none;
		border-radius: 0.6rem;
		padding: 0.5rem 1.1rem;
		cursor: pointer;
		font-family: inherit;
	}
	button:disabled {
		opacity: 0.6;
		cursor: default;
	}
	.form-msg {
		font-size: 0.85rem;
		margin: 0.4rem 0 0;
	}
</style>
