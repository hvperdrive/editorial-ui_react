import classnames from 'classnames';
import PropTypes from 'prop-types';
import { equals, path } from 'ramda';
import React, { Fragment } from 'react';

import DndContainer from '../Dnd/DndContainer';
import DndDragDroppable from '../Dnd/DndDragDroppable';

import { getCellProps, getHeaderProps } from './Table.helpers';
import TableCell from './TableCell/TableCell';
import TableHeader from './TableHeader/TableHeader';
import TablePlaceholder from './TablePlaceholder/TablePlaceholder';
import TableRow from './TableRow/TableRow';
import './Table.scss';

const DND_ITEM_TYPE = 'row';

const Table = ({
	dataKey,
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
	expandedRows,
	type,
	draggable = false,
	loadDataMessage = 'Loading data...',
	noColumnsMessage = 'No columns available.',
	noDataMessage = 'No data available.',
	rowExpansionTemplate = () => null,
	moveRow = () => null,
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

	const findExpandedRowIndex = (row) => {
		if (Array.isArray(expandedRows)) {
			return expandedRows.findIndex((expandedRow) => equals(expandedRow, row));
		}
		return -1;
	};

	const isRowExpanded = (row) => {
		if (dataKey) {
			const dataKeyValue = path([dataKey], row);
			return expandedRows && expandedRows[dataKeyValue] != null;
		}
		return findExpandedRowIndex(row) !== -1;
	};

	/**
	 * Render
	 */
	const renderDraggableRow = (row, rowIndex, level, collapse = false) => {
		const expanded = isRowExpanded(row);
		const id = path([dataKey])(row);

		return (
			<DndDragDroppable
				// Key can NOT be based on index because this will cause issues with react-dnd's
				// ability to set the current item which is being dragged over/hovered
				key={`table-row-${level}-${id}`}
				id={id}
				moveRow={moveRow}
				index={rowIndex}
				accept={[`${DND_ITEM_TYPE}-${level}`, `${DND_ITEM_TYPE}-${level + 1}`]}
			>
				{({ isDragging, dragDropRef }) => (
					<>
						<TableRow
							collapseOnDrag={collapse}
							hasClickAction={hasClickAction}
							onClick={() => onRowClick(row)}
							isDragging={isDragging}
							trRef={dragDropRef}
							level={level}
						>
							{columns.map((col) => (
								<TableCell {...getCellProps(col, row, rowIndex)} />
							))}
						</TableRow>
						{expanded && (
							<tr
								key={`table-row-expanded-${level}-${rowIndex}`}
								className="a-table-expanded-row"
							>
								<td colSpan={columns.length}>
									{rowExpansionTemplate(row)}
								</td>
							</tr>
						)}
						{row?.rows?.length ? row.rows.map(
							(subRow, subRowIndex) => renderDraggableRow(
								subRow,
								subRowIndex,
								level + 1,
								level === 1 && isDragging,
							),
						) : null}

					</>
				)}
			</DndDragDroppable>
		);
	};

	const renderStaticRow = (row, rowIndex, level) => {
		const expanded = isRowExpanded(row);

		return (
			<Fragment key={`table-row-${level}-${rowIndex}`}>
				<TableRow
					hasClickAction={hasClickAction}
					onClick={() => onRowClick(row)}
					level={level}
				>
					{columns.map((col) => (
						<TableCell {...getCellProps(col, row, rowIndex)} />
					))}
				</TableRow>
				{ expanded && (
					<tr className="a-table-expanded-row" key={`table-row-expanded-${level}-${rowIndex}`}>
						<td colSpan={columns.length}>
							{rowExpansionTemplate(row)}
						</td>
					</tr>
				)}
				{row?.rows?.length
					? row.rows.map((subRow, subRowIndex) => renderStaticRow(subRow, subRowIndex, level + 1))
					: null}
			</Fragment>
		);
	};

	const renderTableRow = (row, rowIndex, level = 1) => (draggable
		? renderDraggableRow(row, rowIndex, level)
		: renderStaticRow(row, rowIndex, level));

	return (
		<DndContainer draggable={draggable}>
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
							rows.map((row, index) => renderTableRow(row, index))
						)}
					</tbody>
				</table>
			</div>
		</DndContainer>
	);
};

Table.propTypes = {
	dataKey: PropTypes.string,
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
			fallback: PropTypes.string,
		}),
	])),
	expandedRows: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
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
	rowExpansionTemplate: PropTypes.func,
	draggable: PropTypes.bool,
	striped: PropTypes.bool,
	dragable: PropTypes.bool,
	type: PropTypes.oneOf(['primary', 'secondary']),
	moveRow: PropTypes.func,
};

export default Table;
