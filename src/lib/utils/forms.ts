import { isRecord } from './types';

export function getErrors(errors?: string[] | Record<string, string[]>): Record<string, string[]> {
	return isRecord(errors) ? errors : {};
}
