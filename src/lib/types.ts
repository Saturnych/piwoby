export type ID = string;
export type IsoDate = string | Date;
export type Categories = 'sveltekit' | 'svelte';

export interface Path {
	path?: string;
	type?: string;
	slug: string;
};

export interface Author {
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

export interface Post {
	draft: boolean;
	date: IsoDate;
	title: string;
	author?: ID;
	summary?: string;
	image?: string;
	tags?: string[];
};

export interface Page extends Post {
	children?: Page[];
};

export interface News extends Post {
	categories?: Categories[];
};

export interface Brewery extends Post {
	description?: string;
	href?: string;
	labels?: string[];
};

export type Content = Path & Partial<Author> & Partial<News> & Partial<Brewery>;

export type Contents = {
	authors: Author;
	breweries: Brewery;
	zavod: Brewery;
	news: News;
	pages: Page;
	posts: News;
}

export const isAuthor = (content: Content): content is Author => {
  return 'id' in (content as Author);
};

export const isPost = (content: Content): content is Post => {
  return 'draft' in (content as Post);
};
