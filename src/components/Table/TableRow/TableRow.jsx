import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const TableRow = ({
	children,
	className,
	hasClickAction,
	onClick,
	trRef,
	isDragging,
	level,
}) => (
	<tr
		ref={trRef}
		className={classnames(className, {
			'a-table--clickable': hasClickAction,
			'a-table__row--hover': isDragging,
			'a-table__row--level-1': level === 1,
			'a-table__row--level-2': level === 2,
			'a-table__row--level-3': level === 3,
			'a-table__row--level-4': level === 4,
		})}
		onClick={onClick}
	>
		{children}
	</tr>
);

TableRow.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	hasClickAction: PropTypes.bool,
	onClick: PropTypes.func,
	trRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
	]),
	isDragging: PropTypes.bool,
	level: PropTypes.number,
};

export default TableRow;
