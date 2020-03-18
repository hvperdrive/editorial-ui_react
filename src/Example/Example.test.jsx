import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import Example from './Example';

const noop = () => {};

describe('<Example />', () => {
	it('Should show default text', () => {
		const { findByText } = render(<Example onClick={noop} />);
		const textEl = findByText('Hello world!');

		expect(textEl).not.toBeNull();
	});

	it('Should show custom text', () => {
		const customText = 'Lorem ipsum';
		const { findByText } = render(<Example onClick={noop} text={customText} />);
		const textEl = findByText(customText);

		expect(textEl).not.toBeNull();
	});

	it('Should trigger click', () => {
		const clickFn = jest.fn();
		const { container } = render(<Example onClick={clickFn} />);

		fireEvent.click(container.querySelector('button'));

		expect(clickFn).toHaveBeenCalled();
		expect(clickFn).toHaveBeenCalledTimes(1);
	});
});
