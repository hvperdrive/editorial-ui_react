import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import Timepicker from './Timepicker';

describe('<Timepicker />', () => {
	it('Should display the correct placeholders', () => {
		const { queryByText } = render(
			<Timepicker id="time" />,
		);
		const hoursPlaceholder = queryByText('hh');
		const minutesPlaceholder = queryByText('mm');

		expect(hoursPlaceholder).not.toBeNull();
		expect(minutesPlaceholder).not.toBeNull();
	});

	it('Should display the correct values', () => {
		const { queryByDisplayValue } = render(
			<Timepicker id="time" value="10:30" />,
		);

		const hour = queryByDisplayValue('10');
		const minute = queryByDisplayValue('30');

		expect(hour).not.toBeNull();
		expect(minute).not.toBeNull();
	});

	it('Should return the value after change', () => {
		const onChange = jest.fn();
		const { queryByDisplayValue } = render(
			<Timepicker id="time" value="10:30" onChange={onChange} />,
		);

		const hourSelector = queryByDisplayValue('10');

		fireEvent.change(hourSelector, {
			target: { value: '12' },
		});

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toHaveBeenCalledWith('12:30');
	});

	it('should disable all input fields when the disabled is set to true', () => {
		const { queryByDisplayValue } = render(
			<Timepicker
				disabled
				id="time"
				secondStep={10}
				millisecondStep={100}
				value="12:25:30:400"
			/>,
		);

		const hours = queryByDisplayValue('12');
		const minutes = queryByDisplayValue('25');
		const seconds = queryByDisplayValue('30');
		const milliseconds = queryByDisplayValue('400');

		expect(hours).toHaveAttribute('disabled');
		expect(minutes).toHaveAttribute('disabled');
		expect(seconds).toHaveAttribute('disabled');
		expect(milliseconds).toHaveAttribute('disabled');
	});

	it('should add leading zeroes to the given value when not present', () => {
		const { queryByDisplayValue } = render(
			<Timepicker disabled id="time" secondStep={10} value="4:25:0" />,
		);

		const hours = queryByDisplayValue('04');
		const minutes = queryByDisplayValue('25');
		const seconds = queryByDisplayValue('00');

		expect(hours).not.toBeNull();
		expect(minutes).not.toBeNull();
		expect(seconds).not.toBeNull();
	});
});
