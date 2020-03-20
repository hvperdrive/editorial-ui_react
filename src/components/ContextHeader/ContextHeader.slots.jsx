import PropTypes from 'prop-types';
import React from 'react';

export const ContextHeaderTopSection = ({ children }) => <>{children}</>;
export const ContextHeaderActionsSection = ({ children }) => <>{children}</>;

ContextHeaderActionsSection.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};

ContextHeaderTopSection.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};
