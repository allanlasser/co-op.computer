import type { StandardProperties } from 'csstype';

export function styleToString(styles?: StandardProperties | StandardProperties[]) {
	if (!styles) return '';
	const style: StandardProperties = Array.isArray(styles) ? Object.assign({}, ...styles) : styles;
	return Object.keys(style).reduce(
		(acc, key) =>
			acc +
			key
				.split(/(?=[A-Z])/)
				.join('-')
				.toLowerCase() +
			':' +
			style[key as keyof StandardProperties] +
			';',
		''
	);
}
