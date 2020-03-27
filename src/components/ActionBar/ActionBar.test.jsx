import { render } from '@testing-library/react';
import React from 'react';

import ActionBar from './ActionBar';
import { ActionBarContentSection } from './ActionBar.slots';

describe('<ActionBar />', () => {
	it('Should render content', () => {
		const { findByText } = render(
			<ActionBar>
				<ActionBarContentSection>
					<button className="a-button" type="submit">Submit</button>
				</ActionBarContentSection>
			</ActionBar>,
		);
		const button = findByText('Submit');

		expect(button).not.toBeNull();
	});

	it('Should portal to a given container', () => {
		const actionBarRootId = 'action-bar-root';
		const childTestId = 'action-bar-child';
		document.body.append(`<div id="${actionBarRootId}"></div>`);
		const actionBarContainer = document.getElementById(actionBarRootId);

		render(
			<ActionBar container={actionBarContainer}>
				<ActionBarContentSection>
					<div data-testid={childTestId} />
				</ActionBarContentSection>
			</ActionBar>,
		);
		const { findByTestId } = render(null, { container: actionBarContainer });
		const actionBarChild = findByTestId(childTestId);

		expect(actionBarChild).toBeDefined();
	});
});
