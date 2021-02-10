import {
	act,
	fireEvent,
	render,
	waitFor,
} from '@testing-library/react';
import React, { useRef, useState } from 'react';

import Tooltip from './Tooltip';
import { TooltipTypeMap } from './Tooltip.const';

const ButtonWithTooltip = (props = {}) => {
	const buttonRef = useRef(null);
	const [isVisible, setVisibility] = useState(false);

	return (
		<>
			<button type="button" ref={buttonRef} onClick={() => act(() => setVisibility(true))}>Click me</button>
			<Tooltip isVisible={isVisible} targetRef={buttonRef} {...props}>Some tooltip info</Tooltip>
		</>
	);
};

const renderButtonWithTooltip = (props = {}) => render(<ButtonWithTooltip {...props} />);

describe('<Tooltip/>', () => {
	it('should render a default tooltip', async () => {
		const { queryByText } = renderButtonWithTooltip();
		const button = queryByText('Click me');

		fireEvent.click(button);

		await waitFor(() => {
			const tooltipNode = queryByText('Some tooltip info');
			expect(tooltipNode).toBeDefined();
		});
	});

	it('should render a primary tooltip', async () => {
		const { queryByText } = renderButtonWithTooltip({
			type: TooltipTypeMap.PRIMARY,
		});
		const button = queryByText('Click me');

		fireEvent.click(button);

		await waitFor(() => {
			const tooltipNode = queryByText('Some tooltip info');
			expect(tooltipNode.classList.contains('a-tooltip--primary')).toBe(true);
		});
	});

	it('should render a secondary tooltip', async () => {
		const { queryByText } = renderButtonWithTooltip({
			type: TooltipTypeMap.SECONDARY,
		});
		const button = queryByText('Click me');

		fireEvent.click(button);

		await waitFor(() => {
			const tooltipNode = queryByText('Some tooltip info');
			expect(tooltipNode.classList.contains('a-tooltip--secondary')).toBe(true);
		});
	});
});
