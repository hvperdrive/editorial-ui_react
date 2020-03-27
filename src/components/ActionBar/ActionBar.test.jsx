import { render } from '@testing-library/react';
import React from 'react';

import ActionBar from './ActionBar';
import { ActionBarContentSection } from './ActionBar.slots';

const childTestId = 'action-bar-child';

describe('<ActionBar />', () => {
	it('Should render content', () => {
		const { findByText } = render(
			<ActionBar isOpen>
				<ActionBarContentSection>
					<button className="a-button" type="submit">Submit</button>
				</ActionBarContentSection>
			</ActionBar>,
		);
		const button = findByText('Submit');

		expect(button).not.toBeNull();
	});

	it('Should portal to a given container', () => {
		const rootId = 'action-bar-root';
		document.body.append(`<div id="${rootId}"></div>`);
		const rootContainer = document.getElementById(rootId);

		render(
			<ActionBar container={rootContainer} isOpen>
				<ActionBarContentSection>
					<div data-testid={childTestId} />
				</ActionBarContentSection>
			</ActionBar>,
		);
		const { findByTestId } = render(null, { container: rootContainer });
		const childEl = findByTestId(childTestId);

		expect(childEl).toBeDefined();
	});

	it('Should show the component based on `isOpen` prop', () => {
		const { queryByTestId, rerender } = render(
			<ActionBar isOpen={false}>
				<ActionBarContentSection>
					<div data-testid={childTestId} />
				</ActionBarContentSection>
			</ActionBar>,
		);

		expect(queryByTestId(childTestId)).toBeNull();
		rerender(
			<ActionBar isOpen>
				<ActionBarContentSection>
					<div data-testid={childTestId} />
				</ActionBarContentSection>
			</ActionBar>,
		);
		expect(queryByTestId(childTestId)).not.toBeNull();
	});
});
