import React, { ReactElement, ReactText } from 'react';

import { DefaultComponentProps } from '../../types';

export type TableCellComponent = (
	value: ReactText,
	rowData: unknown,
	rowIndex: number
) => ReactElement | null;
export type TableHeaderComponent = (value: ReactText) => ReactElement | null;
export type TableOrder = 'asc' | 'desc';

export interface TableColumn {
	label: string;
	value?: string;
	component?: TableCellComponent;
	headerComponent?: TableHeaderComponent;
	format?: (
		value: ReactText,
		col: TableColumn,
		rowData: unknown,
		rowIndex: number
	) => ReactText;
	hidden?: boolean;
	disabled?: boolean;
	disableSorting?: boolean;
	classList?: string[];
}

export interface TableOrderBy {
	key: string;
	order: TableOrder;
}

export interface TableProps extends DefaultComponentProps {
	rows?: unknown[];
	columns?: (TableColumn | string)[];
	loading?: boolean;
	responsive?: boolean;
	hasClickAction?: boolean;
	activeSorting?: TableOrderBy;
	noDataMessage?: string;
	loadDataMessage?: string;
	noColumnsMessage?: string;
	orderBy?: (value: TableOrderBy) => void;
	rowClicked?: (rowData: unknown) => void;
	striped?: boolean;
	type?: 'primary' | 'secondary';
}

declare const Table: React.FC<TableProps>;

export default Table;
