import { render } from '@testing-library/react';
import React from 'react';

import ActionBar, { ActionBarContentSection } from './ActionBar';

describe('<ActionBar />', () => {
	it('should render content', () => {
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
});
