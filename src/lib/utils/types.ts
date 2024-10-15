export type Nullable<T> = T | null;

export type Maybe<T> = T | undefined;

export function isString(s: unknown): s is string {
	return Boolean(s) && typeof s === 'string';
}

export function formDataToObject(formData: FormData): Record<string, string> {
	const data: Record<string, string> = {};
	formData.forEach((value, key) => {
		data[key] = value.toString(); // Convert each entry to a string
	});
	return data;
}
