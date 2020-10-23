import { getNodeText, render } from '@testing-library/react';
import React from 'react';

import Status from './Status';
import { STATUS_MOCK_ACTIVE } from './Status.mock';

describe('<Status/>', () => {
	it('should show a label including the correct class', () => {
		const { queryByText, container } = render(
			<Status label={STATUS_MOCK_ACTIVE.label} type={STATUS_MOCK_ACTIVE.type} />,
		);
		const label = queryByText(STATUS_MOCK_ACTIVE.label);
		const statusSuccess = container.querySelector('.u-text-success');

		expect(getNodeText(label)).toBe(STATUS_MOCK_ACTIVE.label);
		expect(statusSuccess).toBeDefined();
	});
});
