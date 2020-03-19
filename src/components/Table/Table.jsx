import classnames from 'classnames';
import React from 'react';

import { DEFAULT_MESSAGE, tablePropTypes } from './Table.const';
import { getCellProps, getHeaderProps } from './Table.helpers';
import TableCell from './TableCell/TableCell';
import TableHeader from './TableHeader/TableHeader';
import TablePlaceholder from './TablePlaceholder/TablePlaceholder';
import TableRow from './TableRow/TableRow';

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
	loadDataMessage = DEFAULT_MESSAGE.loading,
	noColumnsMessage = DEFAULT_MESSAGE.noColumns,
	noDataMesssage = DEFAULT_MESSAGE.noData,
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
			<table className={classnames('a-table', {
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
							noDataMesssage={noDataMesssage}
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

Table.propTypes = { ...tablePropTypes };

export default Table;
