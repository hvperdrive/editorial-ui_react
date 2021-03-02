import { render } from '@testing-library/react';
import React from 'react';

import TableCell from './TableCell';

const MOCK_TABLE_CELL_PROPS = {
	label: 'Full name',
	value: 'John Doe',
	rowData: { name: 'John Doe' },
	rowIndex: 1,
};
const renderTableCell = (
	props,
	options = { container: document.body.appendChild(document.createElement('tr')) },
) => render(
	<TableCell {...MOCK_TABLE_CELL_PROPS} {...props} />,
	options,
);

describe('<TableCell />', () => {
	it('Should render a td element by default', () => {
		const { container } = renderTableCell();
		const rootEl = container.querySelector('td');

		expect(rootEl).not.toBeNull();
	});

	it('Should set extra classes when given', () => {
		const className = 'custom-class';
		const listClass = 'list-class';
		const { container } = renderTableCell({
			className,
			classList: [listClass],
		});
		const rootEl = container.querySelector('td');

		expect(rootEl).toHaveClass(className);
		expect(rootEl).toHaveClass(listClass);
	});

	it('Should render a component when given', () => {
		const rootTestId = 'root-test-id';
		const { queryByTestId, queryByText } = renderTableCell({
			component(value) {
				return <div data-testid={rootTestId}>{value}</div>;
			},
		});
		const customEl = queryByTestId(rootTestId);
		const cellEl = queryByText(MOCK_TABLE_CELL_PROPS.value);

		expect(customEl).not.toBeNull();
		expect(cellEl).not.toBeNull();
		expect(cellEl).toHaveTextContent(MOCK_TABLE_CELL_PROPS.value);
	});

	it('Should render a custom element when given', () => {
		const { container } = renderTableCell(
			{ as: 'div' },
			{ container: document.body.appendChild(document.createElement('div')) },
		);
		const rootEl = container.querySelector('div');

		expect(rootEl).not.toBeNull();
	});

	it('Should render truncated text when given', async () => {
		const { queryByText } = renderTableCell({ ellipsis: true });
		const cellEl = queryByText(MOCK_TABLE_CELL_PROPS.value);

		expect(cellEl).toHaveClass('ellipsis__text');
	});
});
