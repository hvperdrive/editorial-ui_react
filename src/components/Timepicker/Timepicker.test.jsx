import { render } from '@testing-library/react';
import React from 'react';

import Timepicker from './Timepicker';

describe('<Timepicker />', () => {
	it('Should display the correct values', () => {
		const { queryByDisplayValue } = render(
			<Timepicker id="time" value="10:30" />,
		);

		const value = queryByDisplayValue('10:30');

		expect(value).not.toBeNull();
	});

	it('should disable input field when the disabled attribute is set to true', () => {
		const { queryByDisplayValue } = render(
			<Timepicker
				disabled
				id="time"
				value="12:25"
			/>,
		);

		const input = queryByDisplayValue('12:25');

		expect(input).toHaveAttribute('disabled');
	});

	it('should add leading zeroes to the given value when not present', () => {
		const { queryByDisplayValue } = render(
			<Timepicker disabled id="time" secondStep={10} value="4:05" />,
		);

		const input = queryByDisplayValue('04:05');

		expect(input).not.toBeNull();
	});
});
