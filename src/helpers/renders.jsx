import PropTypes from 'prop-types';
import React from 'react';

export const renderChildren = ({ children }) => <>{children}</>;

renderChildren.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};
