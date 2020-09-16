import PropTypes from 'prop-types';
import React from 'react';

export const FileUploadMessage = ({ children }) => <>{children}</>;

FileUploadMessage.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};

export const FileUploadDescription = ({ children }) => <>{children}</>;

FileUploadDescription.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};
