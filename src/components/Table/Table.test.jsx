import { render } from '@testing-library/react';
import React from 'react';

import Table from './Table';
import { TABLE_MOCK_COLUMNS, TABLE_MOCK_ROWS } from './Table.mock';

const message = {
	loading: 'Loading data...',
	noColumns: 'No columns found',
	noData: 'No data found',
};

describe('<Table />', () => {
	it('Should display the correct placeholder message', async () => {
		const { findByText, rerender } = render(<Table noColumnsMessage={message.noColumns} />);
		const noColsMessageEl = await findByText(message.noColumns);

		rerender(<Table columns={TABLE_MOCK_COLUMNS} noDataMessage={message.noData} />);
		const noDataMessageEl = await findByText(message.noData);


		rerender(<Table loading loadDataMessage={message.loading} />);
		const loadingMessageEl = await findByText(message.loading);

		expect(noColsMessageEl).not.toBeNull();
		expect(noDataMessageEl).not.toBeNull();
		expect(loadingMessageEl).not.toBeNull();
	});

	it('Should display columns', () => {
		const { container } = render(
			<Table columns={TABLE_MOCK_COLUMNS} />,
		);
		const tableHeaders = container.querySelectorAll('th');

		const colIndex = TABLE_MOCK_COLUMNS.findIndex((col) => !col.format && !col.headerComponent);

		expect(tableHeaders[colIndex].innerHTML).toBe(TABLE_MOCK_COLUMNS[colIndex].label);
	});

	it('Should display data', () => {
		const { container } = render(
			<Table rows={TABLE_MOCK_ROWS} columns={TABLE_MOCK_COLUMNS} />,
		);
		const tableData = container.querySelectorAll('tbody tr');
		const tableRow = tableData[3];
		const mockRowData = TABLE_MOCK_ROWS[3];
		// Regular column
		const regularColIndex = TABLE_MOCK_COLUMNS.findIndex((mock) => mock.value);
		const regularCell = tableRow.querySelector(`td:nth-child(${regularColIndex + 1})`);
		const regularData = String(mockRowData[TABLE_MOCK_COLUMNS[regularColIndex].value]);
		// Formatted column
		const formatColIndex = TABLE_MOCK_COLUMNS.findIndex((mock) => mock.format);
		const formattedCell = tableRow.querySelector(`td:nth-child(${formatColIndex + 1})`);
		const formattedCol = TABLE_MOCK_COLUMNS[formatColIndex];
		const formattedValue = mockRowData[formattedCol.value];
		const formattedData = formattedCol.format(formattedValue, formattedCol, mockRowData);
		// Column with cell component
		const componentColIndex = TABLE_MOCK_COLUMNS.findIndex((mock) => mock.component);
		const componentCell = tableRow.querySelector(`td:nth-child(${componentColIndex + 1})`);
		const componentCol = TABLE_MOCK_COLUMNS[componentColIndex];
		const componentValue = mockRowData[componentCol.value];
		const componentData = componentCol.component(componentValue, mockRowData);
		const { container: componentContainer } = render(componentData);

		expect(regularCell.innerHTML).toBe(regularData);
		expect(formattedCell.innerHTML).toBe(formattedData);
		expect(componentCell.innerHTML).toBe(componentContainer.innerHTML);
	});
});
