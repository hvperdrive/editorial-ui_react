import PropTypes from 'prop-types';
import React from 'react';

export const FilterBody = ({ children }) => <>{children}</>;


FilterBody.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};
