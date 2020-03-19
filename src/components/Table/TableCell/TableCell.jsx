import PropTypes from 'prop-types';
import React from 'react';

const TableCell = ({
	component,
	rowData,
	rowIndex,
	value,
}) => (
	<td>{component ? component(value, rowData, rowIndex) : value}</td>
);

TableCell.propTypes = {
	component: PropTypes.func,
	// eslint-disable-next-line react/forbid-prop-types
	rowData: PropTypes.any,
	rowIndex: PropTypes.number,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default TableCell;
