import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import TableHeader from './TableHeader';

const MOCK_TABLE_HEADER_PROPS = {
	label: 'Header',
	value: 'header',
};
const renderTableHeader = (
	props,
	options = { container: document.body.appendChild(document.createElement('tr')) },
) => render(
	<TableHeader {...MOCK_TABLE_HEADER_PROPS} {...props} />,
	options,
);

describe('<TableHeader />', () => {
	it('Should render a th element by default', () => {
		const { container } = renderTableHeader();
		const rootEl = container.querySelector('th');

		expect(rootEl).not.toBeNull();
	});

	it('Should set extra classes when given', () => {
		const className = 'custom-class';
		const listClass = 'list-class';
		const { container } = renderTableHeader({
			className,
			classList: [listClass],
		});
		const rootEl = container.querySelector('th');

		expect(rootEl).toHaveClass(className);
		expect(rootEl).toHaveClass(listClass);
	});

	it('Should render a component when given', () => {
		const rootTestId = 'root-test-id';
		const { queryByTestId, queryByText } = renderTableHeader({
			component(value, label) {
				return <div data-testid={rootTestId}>{label}</div>;
			},
		});
		const customEl = queryByTestId(rootTestId);
		const labelEl = queryByText(MOCK_TABLE_HEADER_PROPS.label);

		expect(customEl).not.toBeNull();
		expect(labelEl).not.toBeNull();
		expect(labelEl).toHaveTextContent(MOCK_TABLE_HEADER_PROPS.label);
	});

	it('Should enable sorting by default', () => {
		const { queryByText } = renderTableHeader({
			activeSorting: { key: MOCK_TABLE_HEADER_PROPS.value, order: 'asc' },
		});
		const buttonEl = queryByText(MOCK_TABLE_HEADER_PROPS.label);
		const iconEl = buttonEl.querySelector('.fa');

		expect(buttonEl).toHaveClass('a-table__header__button');
		expect(iconEl).toHaveClass('fa-sort-asc');
	});

	it('Should trigger onSortClick when given', () => {
		const activeSorting = { key: 'name', order: 'asc' };
		const onSortClick = jest.fn();
		const { queryByText } = renderTableHeader({ activeSorting, onSortClick });
		const buttonEl = queryByText(MOCK_TABLE_HEADER_PROPS.label);

		fireEvent.click(buttonEl);

		expect(onSortClick).toHaveBeenCalledTimes(1);
		expect(onSortClick).toHaveBeenCalledWith(MOCK_TABLE_HEADER_PROPS.value, 'desc');
	});

	it('Should not show sorting when disableSorting is true', () => {
		const { container } = renderTableHeader({ disableSorting: true });
		const buttonEl = container.querySelector('button');

		expect(buttonEl).toBeNull();
	});

	it('Should render a custom element when given', () => {
		const { container } = renderTableHeader(
			{ as: 'div' },
			{ container: document.body.appendChild(document.createElement('div')) },
		);
		const rootEl = container.querySelector('div');

		expect(rootEl).not.toBeNull();
	});
});
