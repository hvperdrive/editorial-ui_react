import { getNodeText, render, waitFor } from '@testing-library/react';
import React from 'react';

import { dragAndHold } from '../Dnd/Dnd.helpers';

import Table from './Table';
import { TABLE_MOCK_COLUMNS, TABLE_MOCK_NESTED_ROWS, TABLE_MOCK_ROWS } from './Table.mock';

const message = {
	loading: 'Loading data...',
	noColumns: 'No columns found',
	noData: 'No data found',
};

const columns = TABLE_MOCK_COLUMNS();

describe('<Table />', () => {
	it('Should display the correct placeholder message', async () => {
		const { findByText, rerender } = render(<Table noColumnsMessage={message.noColumns} />);
		const noColsMessageEl = await findByText(message.noColumns);

		rerender(<Table columns={columns} noDataMessage={message.noData} />);
		const noDataMessageEl = await findByText(message.noData);

		rerender(<Table loading loadDataMessage={message.loading} />);
		const loadingMessageEl = await findByText(message.loading);

		expect(noColsMessageEl).not.toBeNull();
		expect(noDataMessageEl).not.toBeNull();
		expect(loadingMessageEl).not.toBeNull();
	});

	it('Should display columns', () => {
		const { container } = render(
			<Table columns={columns} />,
		);
		const tableHeaders = container.querySelectorAll('th');

		const colIndex = columns.findIndex((col) => !col.format && !col.headerComponent);

		expect(tableHeaders[colIndex].innerHTML).toBe(columns[colIndex].label);
	});

	it('Should display data', () => {
		const { container } = render(
			<Table rows={TABLE_MOCK_ROWS} columns={columns} />,
		);
		const tableData = container.querySelectorAll('tbody tr');
		const tableRow = tableData[3];
		const mockRowData = TABLE_MOCK_ROWS[3];
		// Regular column
		const regularColIndex = columns.findIndex((mock) => mock.value);
		const regularCell = tableRow.querySelector(`td:nth-child(${regularColIndex + 1})`);
		const regularData = String(mockRowData[columns[regularColIndex].value]);
		// Formatted column
		const formatColIndex = columns.findIndex((mock) => mock.format);
		const formattedCell = tableRow.querySelector(`td:nth-child(${formatColIndex + 1})`);
		const formattedCol = columns[formatColIndex];
		const formattedValue = mockRowData[formattedCol.value];
		const formattedData = formattedCol.format(formattedValue, formattedCol, mockRowData);
		// Column with cell component
		const componentColIndex = columns.findIndex((mock) => mock.component);
		const componentCell = tableRow.querySelector(`td:nth-child(${componentColIndex + 1})`);
		const componentCol = columns[componentColIndex];
		const componentValue = mockRowData[componentCol.value];
		const componentData = componentCol.component(componentValue, mockRowData);
		const { container: componentContainer } = render(componentData);

		expect(getNodeText(regularCell)).toBe(regularData);
		expect(getNodeText(formattedCell)).toBe(formattedData);
		expect(componentCell.innerHTML).toBe(componentContainer.innerHTML);
	});

	it('Should expand a row and show a rowExpansionTemplate', async () => {
		const templateText = 'expansion template';
		const rowExpansionTemplate = () => templateText;
		const { queryByText } = render(
			<Table
				expandedRows={{
					3: true,
				}}
				rows={TABLE_MOCK_ROWS}
				dataKey="id"
				columns={columns}
				rowExpansionTemplate={rowExpansionTemplate}
			/>,
		);

		const expandedRow = queryByText(templateText);

		expect(expandedRow).not.toBeNull();
	});

	it('Should be able to show nested data', () => {
		const firstNestedDataRow = TABLE_MOCK_NESTED_ROWS.find((row) => (row.rows || []).length);
		const firstNestedDataCell = firstNestedDataRow.rows[0];
		const { container } = render(<Table rows={TABLE_MOCK_NESTED_ROWS} columns={columns} />);
		const firstNestedRowEl = container.querySelector('.a-table__row--level-2');
		const nestedCells = firstNestedRowEl.querySelectorAll('td');

		expect(nestedCells[0]).toHaveTextContent(firstNestedDataCell.id);
		expect(nestedCells[1]).toHaveTextContent(firstNestedDataCell.firstName);
		expect(nestedCells[2]).toHaveTextContent(firstNestedDataCell.lastName);
	});

	it('Should support drag and drop when `draggable` is true', async () => {
		const { container } = render(
			<Table dataKey="id" draggable rows={TABLE_MOCK_ROWS} columns={columns} />,
		);
		const rowElements = container.querySelector('tbody').querySelectorAll('tr');

		// Move first to third
		const draggedRow = rowElements[0];
		const targetRow = rowElements[2];

		dragAndHold(draggedRow, targetRow);

		await waitFor(() => {
			const reorderedRows = container.querySelector('tbody').querySelectorAll('tr');
			expect(reorderedRows[0]).toHaveClass('a-table__row--hovered');
		});
	});
});
