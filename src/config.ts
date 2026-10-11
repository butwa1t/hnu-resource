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
		hue: 174, // 中性主题（饱和度已归零），色相不影响视觉
		fixed: true, // 隐藏主题色选择器
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
	links: [LinkPreset.Home, LinkPreset.Archive, LinkPreset.About],
};

export const profileConfig: ProfileConfig = {
	avatar: "/avatar.svg", // 替换为你自己的头像：把图片放到 public/ 并修改此处
	name: "butwa1t", // 改成你想显示的名字 / 昵称
	bio: "湖南大学 · 课程资料与学习笔记分享",
	links: [],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	theme: "github-dark",
};
