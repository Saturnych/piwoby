import { env as dynamic_private } from '$env/dynamic/private';

const ENV = Object.assign(dynamic_private, import.meta.env);

// SUPABASE
export const PRIVATE_SUPABASE_SERVICE_KEY: string = ENV.PRIVATE_SUPABASE_SERVICE_KEY || '';
export const PRIVATE_JWT_SECRET: string = ENV.PRIVATE_JWT_SECRET || 'some-not-very-nice-very-long-key';
export const PRIVATE_PASS_SECRET: string = ENV.PRIVATE_PASS_SECRET || PRIVATE_JWT_SECRET;

// DB
export const PRIVATE_POSTGRES_URI: string = ENV.PRIVATE_POSTGRES_URI || '';
export const DB_TYPE: string = ENV.DB_TYPE || 'sqlite';
export const DB_STORAGE: string = ENV.DB_STORAGE || 'memory';
export const DB_URI: string =
	!!ENV.DB_TYPE && !!ENV.DB_STORAGE
		? `${ENV.DB_TYPE}::${ENV.DB_STORAGE}`
		: `${DB_TYPE}::${DB_STORAGE}`;
export const SALT_WORK_FACTOR = Number(ENV.SALT_WORK_FACTOR || 10);

// SMTP
export const SMTP_PORT = Number(ENV.SMTP_PORT || 465);
export const SMTP_HOST: string = ENV.SMTP_HOST || 'smtp.yandex.com';
export const SMTP_USER: string = ENV.SMTP_USER || ENV.IMAP_USER || '';
export const SMTP_PASS: string = ENV.SMTP_PASS || ENV.IMAP_PASS || '';
// IMAP
export const IMAP_PORT = Number(ENV.IMAP_HOST || 993);
export const IMAP_HOST: string = ENV.IMAP_HOST || 'imap.yandex.com';
export const IMAP_USER: string = ENV.IMAP_USER || ENV.SMTP_USER || '';
export const IMAP_PASS: string = ENV.IMAP_PASS || ENV.SMTP_PASS || '';
