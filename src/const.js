import PropTypes from 'prop-types';

export const SLOT_PROP_TYPES = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};
