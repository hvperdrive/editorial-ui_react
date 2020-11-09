import PropTypes from 'prop-types';

export const SLOT_PROP_TYPES = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};

export const KEY_CODE = {
	/**
	 * BACKSPACE
	 */
	BACKSPACE: 8,
	/**
	 * TAB
	 */
	TAB: 9,
	/**
	 * ENTER
	 */
	ENTER: 13,
	/**
	 * ESC
	 */
	ESC: 27,
	/**
	 * SPACE
	 */
	SPACE: 32,
	/**
	 * LEFT
	 */
	LEFT: 37,
	/**
	 * UP
	 */
	UP: 38,
	/**
	 * RIGHT
	 */
	RIGHT: 39,
	/**
	 * DOWN
	 */
	DOWN: 40,
};
