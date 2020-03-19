import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const TableRow = ({
	children,
	className,
	hasClickAction,
	onClick,
}) => (
	<tr
		className={classnames(className, { 'a-table--clickable': hasClickAction })}
		onClick={onClick}
	>
		{children}
	</tr>
);

TableRow.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	hasClickAction: PropTypes.bool,
	onClick: PropTypes.func,
};

export default TableRow;
