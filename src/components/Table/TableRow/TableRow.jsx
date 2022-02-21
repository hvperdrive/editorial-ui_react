import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const TableRow = ({
	as: HTMLTag = 'tr',
	children,
	className,
	collapseOnDrag,
	hasClickAction,
	isDragging,
	onClick,
	innerRef,
}) => (
	<HTMLTag
		ref={innerRef}
		className={classnames(className, {
			'a-table--clickable': hasClickAction,
			'a-table__row--hovered': isDragging,
			'a-table__row--collapse': collapseOnDrag,
		})}
		onClick={onClick}
	>
		{children}
	</HTMLTag>
);

TableRow.propTypes = {
	as: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node,
	collapseOnDrag: PropTypes.bool,
	hasClickAction: PropTypes.bool,
	onClick: PropTypes.func,
	innerRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
	]),
	isDragging: PropTypes.bool,
};

export default TableRow;
