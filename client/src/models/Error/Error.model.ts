export interface Error {
	type: 'general' | 'login' | 'server';
	on: string;
	message: string;
}
