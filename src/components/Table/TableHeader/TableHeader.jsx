import PropTypes from 'prop-types';
import React from 'react';

import { orderByType } from '../Table.const';

const TableHeader = ({
	className,
	label,
	value = '',
	component,
}) => (
	<th className={className}>{component ? component(value) : label}</th>
);

TableHeader.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	component: PropTypes.func,
	// eslint-disable-next-line react/no-unused-prop-types
	activeSorting: orderByType,
	// eslint-disable-next-line react/no-unused-prop-types
	onSortClick: PropTypes.func,
};

export default TableHeader;
