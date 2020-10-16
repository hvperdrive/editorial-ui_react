export const isNull = (value) => value === null;
export const isUndefined = (value) => value === undefined;
export const isNil = (value) => isNull(value) || isUndefined(value);

export const isObject = (value) => {
	const type = typeof value;
	return !isNull(value) && (type === 'object' || type === 'function');
};
export const isNumber = (value) => typeof value === 'number';
export const isString = (value) => typeof value === 'string';
