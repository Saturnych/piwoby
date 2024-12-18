export type ID = string;
export type IsoDate = string | Date;
export type Categories = 'sveltekit' | 'svelte';

export type Path = {
	path?: string;
	type?: string;
	slug: string;
};

export interface IAuthor {
	id: ID;
	name: string;
	avatar?: string;
	occupation?: string;
	company?: string;
	email?: string;
	twitter?: string;
	linkedin?: string;
	github?: string;
	href?: string;
};

export interface IPost {
	draft: boolean;
	date: IsoDate;
	title: string;
	author?: ID;
	summary?: string;
	image?: string;
	tags?: string[];
};

export interface IPage extends IPost {
	children?: Page[];
};

export interface INews extends IPost {
	categories?: Categories[];
};

export interface IBrewery extends IPost {
	description?: string;
	href?: string;
	labels?: string[];
};

export type Content = Path & Partial<IAuthor> & Partial<INews> & Partial<IBrewery> & Partial<IPage>;

export type Contents = {
	authors: IAuthor[];
	breweries: IBrewery[];
	zavod: IBrewery[];
	news: INews[];
	pages: IPage[];
	posts: INews[];
}

export const isAuthor = (content: Content): content is IAuthor => {
	return 'id' in (content as IAuthor);
};

export const isPost = (content: Content): content is IPost => {
	return 'draft' in (content as IPost);
};
