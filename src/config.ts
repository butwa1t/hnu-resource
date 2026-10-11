import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "HNU Resource",
	subtitle: "课程资料 · 学习笔记",
	lang: "zh_CN", // 'en', 'zh_CN', 'ja' ...
	themeColor: {
		hue: 174, // 青绿主题色（0~360），与参考站点风格接近
		fixed: false, // 是否对访客隐藏主题色选择器
	},
	banner: {
		enable: false,
		src: "assets/images/demo-banner.png",
		position: "center",
		credit: {
			enable: false,
			text: "",
			url: "",
		},
	},
	toc: {
		enable: true,
		depth: 2,
	},
	favicon: [],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/butwa1t/hnu-resource",
			external: true,
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "/avatar.svg", // 替换为你自己的头像：把图片放到 public/ 并修改此处
	name: "butwa1t", // 改成你想显示的名字 / 昵称
	bio: "湖南大学 · 课程资料与学习笔记分享。留言区欢迎提建议～",
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/butwa1t/hnu-resource",
		},
		// 如需邮箱，取消下面注释并改成你的邮箱：
		// {
		// 	name: "Email",
		// 	icon: "fa6-regular:envelope",
		// 	url: "mailto:you@example.com",
		// },
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	theme: "github-dark",
};
