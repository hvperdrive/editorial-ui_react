import PropTypes from 'prop-types';

export const headerPropTypes = {
	title: PropTypes.string.isRequired,
	badges: PropTypes.arrayOf(PropTypes.shape({
		type: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger']).isRequired,
		name: PropTypes.string.isRequired,
	})),
	tabs: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		target: PropTypes.string.isRequired,
		active: PropTypes.bool,
		disabled: PropTypes.bool,
	})),
	linkProps: PropTypes.func,
};
