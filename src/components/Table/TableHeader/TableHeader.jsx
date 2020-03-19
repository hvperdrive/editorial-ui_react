import PropTypes from 'prop-types';
import React from 'react';

const TableHeader = ({
	className,
	component,
	label,
	value = '',
}) => (
	<th className={className}>{component ? component(value) : label}</th>
);

TableHeader.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	component: PropTypes.func,
};

export default TableHeader;
