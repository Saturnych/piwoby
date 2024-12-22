
export const config: Record<string, string | boolean> = {
	name: 'piwoby',
	version: '0.0.2',
	author: 'Denis Glebko',
	repository: 'https://github.com/Saturnych/piwoby',
	title: 'Piwo.by',
	headerTitle: 'Пиво Беларуси',
	description: 'Пиво Беларуси',
	language: 'ru-ru',
	locale: 'ru-RU',
	theme: 'system', // system, dark or light
	domain: 'piwo.by',
	siteUrl: 'https://piwo.by',
	siteRepo: 'https://github.com/Saturnych/piwoby',
	siteLogo: '/assets/logo.png',
	// image: '/assets/img/avatar.png',
	email: 'm@piwo.by',
	github: 'https://github.com/Saturnych',
	twitter: 'https://twitter.com/Saturnych',
	facebook: 'https://www.facebook.com/Saturnych',
	//youtube: 'https://www.youtube.com/watch?v=p3RwX06wcBs',
	linkedin: 'https://www.linkedin.com/in/saturn/',
	primaryColor: '#06a261',
	// supports buttondown, convertkit, emailoctopus, klaviyo, mailchimp, revue
	// use false or null to disable newsletter
	// check .env.example for settings needed values for each service
	newsletter: false, //'mailchimp',
	multiuser: false,
};

export const user: Record<string, string> = {
	id: 'Saturnych',
	name: 'Денис Глебко',
	avatar: '/assets/img/saturnych.jpg',
	email: 'saturnych@gmail.com',
	twitter: 'https://twitter.com/Saturnych',
	linkedin: 'https://www.linkedin.com/in/saturn/',
	github: 'https://github.com/Saturnych',
};

export const navLinks: { slug: string; title: string; }[] = [
	{ slug: 'news', title: 'Новости' },
	{ slug: 'posts', title: 'Статьи' },
	{ slug: 'zavod', title: 'Пивзаводы' },
	//{ slug: 'projects', title: 'Projects' },
	{ slug: 'pages/about', title: 'О сайте' },
];

export const openGraph: Record<string, number | boolean> = {
	enabled: true,
	width: 1200,
	height: 630
};

// supported systems: googleAnalytics, plausible, and simpleAnalytics
export const analytics: Record<string, string | boolean> = {
	googleAnalyticsId: '', // e.g. UA-000000-2 or G-XXXXXXX
	plausibleDomain: '', // e.g. pied-piper-blog.netlify.app
	simpleAnalytics: false // true or false
};

// supported providers: giscus, utterances
export const comment: Record<string, string | object> = {
	provider: 'giscus',
	giscus: {
		// Visit the link below, and follow the steps in the 'configuration' section
		// https://giscus.app/
		repo: 'Saturnych/piwoby',
		reposId: 'R_kgDOLtsxPw',
		category: 'General',
		categoryId: 'DIC_kwDOLtsxP84Cercp',
		mapping: 'pathname', // supported options: pathname, url, title
		reactionsEnabled: '1', // Emoji reactions: 1 = enable / 0 = disable
		// Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
		emitMetadata: '1',
		// theme example: light, dark, dark_dimmed, dark_high_contrast
		// Place the comment box above the comments. options: bottom, top
		inputPosition: 'top',
		// Choose the language giscus will be displayed in. options: en, es, zh-CN, zh-TW, ko, ja etc
		lang: 'en',
		dataStrict: '0',
		loading: 'lazy',
		// theme example: light, dark, preferred_color_scheme, light_high_contrast, dark_high_contrast
		// light_protanopia, dark_protanopiam, light_tritanopia, dark_tritanopia, dark_dimmed, transparent_dark
		theme: 'preferred_color_scheme',
		// theme when dark mode
		darkTheme: 'dark_tritanopia',
		themeURL: ''
	},
	utterances: {
		// Visit the link below, and follow the steps in the 'configuration' section
		// https://utteranc.es/
		repo: 'Saturnych/piwoby',
		issueTerm: 'pathname', // supported options: pathname, url, title
		label: 'Comment 💬', // label (optional): Comment 💬
		// theme example: github-light, github-dark, preferred-color-scheme
		// github-dark-orange, icy-dark, dark-blue, photon-dark, boxy-light, gruvbox-dark"
		theme: 'github-light',
		// theme when dark mode
		darkTheme: 'github-dark'
	}
};
