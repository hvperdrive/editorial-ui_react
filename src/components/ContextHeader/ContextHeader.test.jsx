import { getNodeText, render } from '@testing-library/react';
import React from 'react';

import ContextHeader from './ContextHeader';
import {
	CONTEXT_HEADER_MOCK_BADGES,
	CONTEXT_HEADER_MOCK_TABS,
	CONTEXT_HEADER_MOCK_TITLE,
} from './ContextHeader.mock';
import { ContextHeaderActionsSection, ContextHeaderTopSection } from './ContextHeader.slots';

const renderContextHeader = (props, TopSectionComponent, ActionSectionComponent) => {
	const defaultProps = {
		title: CONTEXT_HEADER_MOCK_TITLE,
	};
	return render((
		<ContextHeader {...defaultProps} {...props}>
			{ TopSectionComponent && (
				<ContextHeaderTopSection>
					<TopSectionComponent />
				</ContextHeaderTopSection>
			)}
			{ ActionSectionComponent && (
				<ContextHeaderActionsSection>
					<ActionSectionComponent />
				</ContextHeaderActionsSection>
			)}
		</ContextHeader>));
};

const TopSectionComponent = () => (<div data-testid="top-section-component" />);
const ActionSectionComponent = () => (<div data-testid="action-section-component" />);
const CustomLinkComponent = () => (<div data-testid="custom-link-component" />);

describe('<ContextHeader/>', () => {
	it('should show a title with badges', () => {
		const { queryByText, container } = renderContextHeader({
			badges: CONTEXT_HEADER_MOCK_BADGES,
		});

		const title = queryByText(CONTEXT_HEADER_MOCK_TITLE);
		const wrapperBadges = container.querySelector('.o-context-header__badges');
		const badges = wrapperBadges.querySelectorAll('span');

		expect(getNodeText(title)).toBe(CONTEXT_HEADER_MOCK_TITLE);
		expect(wrapperBadges).toBeDefined();
		expect(badges).toHaveLength(2);
		expect(getNodeText(badges[0])).toBe(CONTEXT_HEADER_MOCK_BADGES[0].name);
		expect(getNodeText(badges[1])).toBe(CONTEXT_HEADER_MOCK_BADGES[1].name);
	});

	describe('tabs', () => {
		it('should show a title with tabs', () => {
			const { queryByText, container } = renderContextHeader({
				tabs: CONTEXT_HEADER_MOCK_TABS,
			});

			const title = queryByText(CONTEXT_HEADER_MOCK_TITLE);
			const wrapperTabs = container.querySelector('ul');
			const tabs = wrapperTabs.querySelectorAll('a');

			expect(getNodeText(title)).toBe(CONTEXT_HEADER_MOCK_TITLE);
			expect(wrapperTabs).toBeDefined();
			expect(tabs).toHaveLength(4);
			expect(getNodeText(tabs[0])).toBe(CONTEXT_HEADER_MOCK_TABS[0].name);
			expect(getNodeText(tabs[1])).toBe(CONTEXT_HEADER_MOCK_TABS[1].name);
			expect(getNodeText(tabs[2])).toBe(CONTEXT_HEADER_MOCK_TABS[2].name);
			expect(getNodeText(tabs[3])).toBe(CONTEXT_HEADER_MOCK_TABS[3].name);
		});

		it('should override the default a tag with a given component', () => {
			const { queryAllByTestId } = renderContextHeader({
				tabs: CONTEXT_HEADER_MOCK_TABS,
				linkProps: (props) => ({ ...props, component: CustomLinkComponent }),
			});

			const customLinks = queryAllByTestId('custom-link-component');

			expect(customLinks).toBeDefined();
			expect(customLinks).toHaveLength(4);
		});
	});

	it('should show a component in the top section slot', () => {
		const { findByTestId } = renderContextHeader({}, TopSectionComponent);
		const topSectionNode = findByTestId('top-section-component');

		expect(topSectionNode).toBeDefined();
	});

	it('should show a component in the action section slot', () => {
		const { findByTestId } = renderContextHeader({}, undefined, ActionSectionComponent);
		const actionSectionNode = findByTestId('action-section-component');

		expect(actionSectionNode).toBeDefined();
	});
});
