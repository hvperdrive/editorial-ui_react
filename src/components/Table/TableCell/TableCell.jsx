import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { EllipsisWithTooltip } from '../../EllipsisWithTooltip';

const TableCell = ({
	classList,
	component,
	rowData,
	rowIndex,
	value,
	ellipsis = false,
}) => (
	<td className={classnames(classList)}>
		{ ellipsis && value !== null && value !== undefined ? (
			<EllipsisWithTooltip type="primary">
				{component ? component(value, rowData, rowIndex) : value}
			</EllipsisWithTooltip>
		) : (
			<>
				{component ? component(value, rowData, rowIndex) : value}
			</>
		)}
	</td>
);

TableCell.propTypes = {
	classList: PropTypes.arrayOf(PropTypes.string),
	ellipsis: PropTypes.bool,
	component: PropTypes.func,
	rowData: PropTypes.oneOfType([PropTypes.object]),
	rowIndex: PropTypes.number,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
};

export default TableCell;
