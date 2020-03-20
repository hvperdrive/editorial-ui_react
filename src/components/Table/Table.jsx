import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { getCellProps, getHeaderProps } from './Table.helpers';
import TableCell from './TableCell/TableCell';
import TableHeader from './TableHeader/TableHeader';
import TablePlaceholder from './TablePlaceholder/TablePlaceholder';
import TableRow from './TableRow/TableRow';
import './Table.scss';

const Table = ({
	className,
	rows = [],
	columns = [],
	loading = false,
	responsive = true,
	hasClickAction = false,
	activeSorting,
	orderBy,
	rowClicked,
	striped = true,
	type,
	loadDataMessage = 'Loading data...',
	noColumnsMessage = 'No columns available.',
	noDataMessage = 'No data available.',
}) => {
	// Computed
	const hasCols = !loading && columns.length > 0;
	const hasData = !loading && rows.length > 0;
	const showPlaceholder = loading || !hasCols || !hasData;

	/**
	 * Methods
	 */
	const onRowClick = (rowData) => {
		if (hasClickAction && rowClicked) {
			rowClicked(rowData);
		}
	};

	const onSortClick = (key, order) => {
		if (orderBy) {
			orderBy({ key, order });
		}
	};

	/**
	 * Render
	 */
	return (
		<div className={classnames(className, { 'a-table__wrapper-responsive': responsive })}>
			<table
				className={classnames('a-table', {
					'a-table--striped': striped,
					[`a-table--${type}`]: type,
				})}
			>
				{columns.length > 0 && (
					<thead>
						<TableRow>
							{columns.map((col) => (
								<TableHeader {...getHeaderProps(col, activeSorting, onSortClick)} />
							))}
						</TableRow>
					</thead>
				)}
				<tbody>
					{showPlaceholder ? (
						<TablePlaceholder
							colSpan={columns.length}
							hasCols={hasCols}
							hasData={hasData}
							loading={loading}
							noDataMessage={noDataMessage}
							loadDataMessage={loadDataMessage}
							noColumnsMessage={noColumnsMessage}
						/>
					) : (
						rows.map((row, rowIndex) => (
							<TableRow
								key={`table-row-${rowIndex}`}
								hasClickAction={hasClickAction}
								onClick={() => onRowClick(row)}
							>
								{columns.map((col) => (
									<TableCell {...getCellProps(col, row, rowIndex)} />
								))}
							</TableRow>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

Table.propTypes = {
	className: PropTypes.string,
	rows: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
	columns: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: PropTypes.string,
			component: PropTypes.func,
			headerComponent: PropTypes.func,
			format: PropTypes.func,
			hidden: PropTypes.bool,
			disabled: PropTypes.bool,
			disableSorting: PropTypes.bool,
			classList: PropTypes.arrayOf(PropTypes.string),
		}),
	])),
	loading: PropTypes.bool,
	responsive: PropTypes.bool,
	hasClickAction: PropTypes.bool,
	activeSorting: PropTypes.shape({
		key: PropTypes.string,
		order: PropTypes.oneOf(['asc', 'desc']),
	}),
	noDataMessage: PropTypes.string,
	loadDataMessage: PropTypes.string,
	noColumnsMessage: PropTypes.string,
	orderBy: PropTypes.func,
	rowClicked: PropTypes.func,
	striped: PropTypes.bool,
	type: PropTypes.oneOf(['primary', 'secondary']),
};

export default Table;
