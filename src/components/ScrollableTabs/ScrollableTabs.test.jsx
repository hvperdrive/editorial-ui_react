import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import ScrollableTabs from './ScrollableTabs';
import { MOCK_TABS } from './ScrollableTabs.mock';

const containerWidth = 320;
const baseContainer = document.createElement('div');
baseContainer.style.cssText = `max-width: ${containerWidth}px; width: 100%;`;

describe('<ScrollableTabs />', () => {
	const tabsComponent = <ScrollableTabs items={MOCK_TABS} />;

	it('Should show correct gradients after scroll', () => {
		const { container } = render(tabsComponent, { container: baseContainer });
		const containerEl = container.querySelector('.o-scrollable-tabs');
		const tabsEl = container.querySelector('.m-nav-tabs');

		// Scroll to far right
		fireEvent.scroll(tabsEl, { target: { scrollLeft: containerWidth } });

		expect(containerEl.classList.contains('o-scrollable-tabs--gradient-left')).toBeTruthy();
		expect(containerEl.classList.contains('o-scrollable-tabs--gradient-right')).toBeFalsy();
	});
});
