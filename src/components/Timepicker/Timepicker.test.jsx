import { render } from '@testing-library/react';
import React from 'react';

import Timepicker from './Timepicker';
import { HOURS, MINUTES } from './Timepicker.mock';

describe('<Timepicker />', () => {
	it('Should display the correct placeholders', async () => {
		const { findByText } = render(
			<Timepicker id="time" hourOptions={HOURS} minuteOptions={MINUTES} />,
		);
		const hoursPlaceholder = await findByText('hh');
		const minutesPlaceholder = await findByText('mm');

		expect(hoursPlaceholder).not.toBeNull();
		expect(minutesPlaceholder).not.toBeNull();
	});

	it('Should display the correct values', async () => {
		const date = '2020-07-30T12:49:00.907Z';
		const { findByText } = render(
			<Timepicker id="time" hourOptions={HOURS} minuteOptions={MINUTES} value={date} />,
		);

		const hour = await findByText('12');
		const minute = await findByText('49');

		expect(hour).not.toBeNull();
		expect(minute).not.toBeNull();
	});
});
