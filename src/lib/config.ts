import { author, homepage, repository } from '../../package.json';

export const config = {
	author,
	title: 'Piwo.by',
	headerTitle: 'Пиво Беларуси',
	description: 'Пиво Беларуси',
	language: 'ru-ru',
	locale: 'ru-RU',
	theme: 'system', // system, dark or light
	domain: homepage,
	siteUrl: homepage,
	siteRepo: repository.url,
	siteLogo: '/logo.png',
	// image: '/img/avatar.png',
	email: 'saturnych@gmail.com',
	github: 'https://github.com/Saturnych',
	twitter: 'https://twitter.com/Saturnych',
	facebook: 'https://www.facebook.com/Saturnych',
	//youtube: 'https://www.youtube.com/watch?v=p3RwX06wcBs',
	linkedin: 'https://www.linkedin.com/in/saturn/',
	primaryColor: '#06a261',

	// supports buttondown, convertkit, emailoctopus, klaviyo, mailchimp, revue
	// use false or null to disable newsletter
	// check .env.example for settings needed values for each service
	newsletter: 'mailchimp',

	multiuser: true
};

export const user = {
	name: 'Saturnych',
	// avatar value can be removed for image
	avatar: '/logo.png',
	// twitter value can be removed for no link to twitter
	twitter: 'https://twitter.com/Saturnych'
};

export const navLinks = [
	{ href: '/about', title: 'О сайте' },
	//{ href: '/projects', title: 'Projects' },
	{ href: '/blog', title: 'Статьи' }
];

export const openGraph = {
	enabled: true,
	width: 1200,
	height: 630
};

// supported systems: googleAnalytics, plausible, and simpleAnalytics
export const analytics = {
	googleAnalyticsId: '', // e.g. UA-000000-2 or G-XXXXXXX
	plausibleDomain: '', // e.g. pied-piper-blog.netlify.app
	simpleAnalytics: false // true or false
};

// supported providers: giscus, utterances
export const comment = {
	provider: 'giscus',
	giscus: {
		// Visit the link below, and follow the steps in the 'configuration' section
		// https://giscus.app/
		repo: repository.url.replace('https://github.com/','').replace('.git',''),
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
		repo: repository.url.replace('https://github.com/','').replace('.git',''),
		issueTerm: 'pathname', // supported options: pathname, url, title
		label: 'Comment 💬', // label (optional): Comment 💬
		// theme example: github-light, github-dark, preferred-color-scheme
		// github-dark-orange, icy-dark, dark-blue, photon-dark, boxy-light, gruvbox-dark"
		theme: 'github-light',
		// theme when dark mode
		darkTheme: 'github-dark'
	}
};
