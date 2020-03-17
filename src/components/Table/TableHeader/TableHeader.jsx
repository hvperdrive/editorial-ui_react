import PropTypes from 'prop-types';
import React from 'react';

import { orderByType } from '../Table.const';

const TableHeader = ({ className, label, value = '', component }) => (
	<th className={className}>{component ? component(value) : label}</th>
);

TableHeader.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	component: PropTypes.func,
	activeSorting: orderByType,
	onSortClick: PropTypes.func,
};

export default TableHeader;
