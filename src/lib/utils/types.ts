export type Nullable<T> = T | null;

export type Maybe<T> = T | undefined;

export function isString(s: unknown): s is string {
	return Boolean(s) && typeof s === 'string';
}

export function isRecord<T>(value?: unknown): value is Record<string, T> {
	return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

export function isArray<T>(value?: unknown): value is Array<T> {
	return Boolean(value) && Array.isArray(value);
}

export function formDataToObject(formData: FormData): Record<string, string> {
	const data: Record<string, string> = {};
	formData.forEach((value, key) => {
		data[key] = value.toString(); // Convert each entry to a string
	});
	return data;
}
