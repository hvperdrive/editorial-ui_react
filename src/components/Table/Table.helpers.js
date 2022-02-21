import { isNil, isObject, isString } from '../../helpers';

const getCellValue = (rowData, key, fallback) => {
	if (!key) {
		return null;
	}

	const value = rowData[key];

	if (isObject(value)) {
		return String(value);
	}

	if (isNil(value) && fallback) {
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

export const getHeaderProps = (col, activeSorting, onSortClick, columnIndex) => {
	const keyPrefix = 'table-header';

	if (isString(col)) {
		return { key: `${keyPrefix}-${col}-${columnIndex}`, label: col };
	}

	return {
		key: `${keyPrefix}-${col.label}-${columnIndex}`,
		component: col.headerComponent,
		classList: col.classList,
		disableSorting: col.disableSorting,
		label: col.label,
		value: col.value,
		width: col.width,
		hideLabel: col.hideLabel,
		activeSorting,
		onSortClick,
	};
};

export const getCellProps = (col, colIndex, rowData, rowIndex, indentSize, level = 1) => {
	const suffix = isString(col) && col ? col : col.label ? col.label : colIndex;
	const key = `table-cell-${suffix}`;

	if (isString(col)) {
		return { key, label: col };
	}

	const indentStyle = { borderLeft: `${(level - 1) * (indentSize / 16)}rem solid white` };
	const style = colIndex === 0 && level > 1 ? indentStyle : {};

	return {
		key,
		classList: col.classList,
		component: col.component,
		ellipsis: col.ellipsis,
		rowData,
		rowIndex,
		value: getFormatValue(rowData, col, rowIndex),
		style,
	};
};
