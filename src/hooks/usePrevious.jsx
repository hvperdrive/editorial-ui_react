import { useRef } from 'react';

/**
 * A Hook to store the previous value
 */
const usePrevious = (state) => {
	const prevRef = useRef();
	const curRef = useRef();

	prevRef.current = curRef.current;
	curRef.current = state;

	return prevRef.current;
};

export default usePrevious;
