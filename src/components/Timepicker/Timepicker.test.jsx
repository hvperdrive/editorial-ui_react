import { render } from '@testing-library/react';
import React from 'react';

import Timepicker from './Timepicker';

describe('<Timepicker />', () => {
	it('Should display the correct placeholders', async () => {
		const { findByText } = render(
			<Timepicker id="time" />,
		);
		const hoursPlaceholder = await findByText('hh');
		const minutesPlaceholder = await findByText('mm');

		expect(hoursPlaceholder).not.toBeNull();
		expect(minutesPlaceholder).not.toBeNull();
	});

	it('Should display the correct values', async () => {
		const { findByText } = render(
			<Timepicker id="time" value="10:30" />,
		);

		const hour = await findByText('10');
		const minute = await findByText('30');

		expect(hour).not.toBeNull();
		expect(minute).not.toBeNull();
	});
});
