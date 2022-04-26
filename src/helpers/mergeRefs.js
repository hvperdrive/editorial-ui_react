import { isNil } from './typeCheck';

export const mergeRefs = (refs) => (value) => {
	refs.forEach((ref) => {
		if (typeof ref === 'function') {
			ref(value);
		} else if (!isNil(ref)) {
			// eslint-disable-next-line no-param-reassign
			ref.current = value;
		}
	});
};
