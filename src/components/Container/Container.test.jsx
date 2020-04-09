import { render } from '@testing-library/react';
import React from 'react';

import Container from './Container';

const childTestId = 'container-child';
const containerClass = 'u-container--custom';

describe('<Container />', () => {
	const containerComponent = (
		<Container className={containerClass}>
			<div data-testid={childTestId} />
		</Container>
	);

	it('Should pass `className`', () => {
		const { container } = render(containerComponent);
		const containerEl = container.querySelector('.u-container');

		expect(containerEl.classList.contains(containerClass)).toBeTruthy();
	});

	it('Should pass `children`', () => {
		const { queryByTestId } = render(containerComponent);
		const childEl = queryByTestId(childTestId);

		expect(childEl).toBeDefined();
	});
});
