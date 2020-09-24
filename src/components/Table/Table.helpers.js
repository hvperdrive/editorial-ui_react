const getCellValue = (rowData, key) => (rowData[key] ?? String(rowData[key]));

const getFormatValue = (rowData, col, rowIndex) => {
	if (typeof col === 'string') {
		return getCellValue(rowData, col);
	}

	const cellValue = getCellValue(rowData, col.value);

	return col.format
		? col.format(cellValue, col, rowData, rowIndex)
		: cellValue;
};

export const getHeaderProps = (col, activeSorting, onSortClick) => {
	const keyPrefix = 'table-header';

	if (typeof col === 'string') {
		return { key: `${keyPrefix}-${col}`, label: col };
	}

	return {
		key: `${keyPrefix}-${col.label}`,
		component: col.headerComponent,
		classList: col.classList,
		disableSorting: col.disableSorting,
		label: col.label,
		value: col.value,
		activeSorting,
		onSortClick,
	};
};

export const getCellProps = (col, rowData, rowIndex) => {
	const keyPrefix = 'table-cell';

	if (typeof col === 'string') {
		return { key: `${keyPrefix}-${col}`, label: col };
	}

	return {
		key: `${keyPrefix}-${col.label}`,
		classList: col.classList,
		component: col.component,
		rowData,
		rowIndex,
		value: getFormatValue(rowData, col, rowIndex),
	};
};
