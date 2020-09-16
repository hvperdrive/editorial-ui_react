import { render } from '@testing-library/react';
import React from 'react';

import ProgressBar from './ProgressBar';

const renderProgressBar = (props) => render(
	<ProgressBar {...props} max="100" />,
);

describe('<ProgressBar/>', () => {
	it('should visualize the progress', () => {
		const { queryByRole } = renderProgressBar({
			value: 50,
		});
		const progressInnerNode = queryByRole('progressbar');

		expect(progressInnerNode).toBeDefined();
		expect(progressInnerNode.style.width).toBe('50%');
		expect(progressInnerNode.getAttribute('aria-valuemax')).toBe('100');
		expect(progressInnerNode.getAttribute('aria-valuenow')).toBe('50');
		expect(progressInnerNode.getAttribute('aria-valuemin')).toBe('0');
	});
});
