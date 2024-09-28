export type Nullable<T> = T | null;

export function isString(s: unknown): s is string {
	return Boolean(s) && typeof s === 'string';
}
