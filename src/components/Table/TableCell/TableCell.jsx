import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const TableCell = ({
	classList,
	component,
	rowData,
	rowIndex,
	value,
}) => (
	<td className={classnames(classList)}>
		{component ? component(value, rowData, rowIndex) : value}
	</td>
);

TableCell.propTypes = {
	classList: PropTypes.arrayOf(PropTypes.string),
	component: PropTypes.func,
	rowData: PropTypes.oneOfType([PropTypes.object]),
	rowIndex: PropTypes.number,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default TableCell;
