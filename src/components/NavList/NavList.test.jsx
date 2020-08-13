import { render } from '@testing-library/react';
import React from 'react';

import NavList from './NavList';
import { MOCK_ITEMS_ERROR } from './NavList.mock';

const navListClass = 'm-navlist-custom';

describe('<NavList />', () => {
	const navListComponent = (
		<NavList className={navListClass} items={MOCK_ITEMS_ERROR} />
	);
	it('Should pass `className`', () => {
		const { container } = render(navListComponent);
		const navListEl = container.querySelector('.m-nav-list');

		expect(navListEl.classList.contains(navListClass)).toBeTruthy();
	});

	it('Should render `items`', () => {
		const { queryByText } = render(navListComponent);

		const item0El = queryByText(MOCK_ITEMS_ERROR[0].label);
		const item2El = queryByText(MOCK_ITEMS_ERROR[2].label);

		expect(item0El).not.toBeNull();
		expect(item2El).not.toBeNull();
	});

	it('Should set correct styling on item with error', () => {
		const itemWithError = MOCK_ITEMS_ERROR.find((item) => item.hasError);
		const { getByText } = render(navListComponent);

		const itemEl = getByText(`${itemWithError.label}*`);
		const listItemEl = itemEl.parentElement;

		expect(listItemEl.classList.contains('m-nav-list__item--error')).toBeTruthy();
	});
});
