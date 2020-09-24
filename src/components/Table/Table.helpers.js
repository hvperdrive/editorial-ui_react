import { isNill, isObject, isString } from '../../helpers';

const getCellValue = (rowData, key, fallback) => {
	const value = rowData[key];

	if (isObject(value)) {
		return String(value);
	}

	if (isNill(value) && fallback) {
		return fallback;
	}

	return value;
};

const getFormatValue = (rowData, col, rowIndex) => {
	if (isString(col)) {
		return getCellValue(rowData, col);
	}

	const cellValue = getCellValue(rowData, col.value, col.fallback);

	return col.format
		? col.format(cellValue, col, rowData, rowIndex)
		: cellValue;
};

export const getHeaderProps = (col, activeSorting, onSortClick) => {
	const keyPrefix = 'table-header';

	if (isString(col)) {
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

	if (isString(col)) {
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
