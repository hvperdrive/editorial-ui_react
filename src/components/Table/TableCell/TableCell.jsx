import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { EllipsisWithTooltip } from '../../EllipsisWithTooltip';

const TableCell = ({
	as: HTMLTag = 'td',
	classList,
	className,
	component,
	rowData,
	rowIndex,
	value,
	ellipsis = false,
	style,
}) => (
	<HTMLTag className={classnames(className, classList)} style={style}>
		{ ellipsis && value !== null && value !== undefined ? (
			<EllipsisWithTooltip type="primary">
				{component ? component(value, rowData, rowIndex) : value}
			</EllipsisWithTooltip>
		) : (
			<>
				{component ? component(value, rowData, rowIndex) : value}
			</>
		)}
	</HTMLTag>
);

TableCell.propTypes = {
	as: PropTypes.string,
	classList: PropTypes.arrayOf(PropTypes.string),
	className: PropTypes.string,
	ellipsis: PropTypes.bool,
	component: PropTypes.func,
	rowData: PropTypes.oneOfType([PropTypes.object]),
	rowIndex: PropTypes.number,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
	style: PropTypes.shape(),
};

export default TableCell;
