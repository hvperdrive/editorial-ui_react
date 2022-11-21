import { render } from '@testing-library/react';
import React from 'react';

import CharacterCount from './CharacterCount';

const renderCharacterCount = (props) => render(<CharacterCount {...props} />);

describe('<CharacterCount />', () => {
	it('Should pass `className`', () => {
		const className = 'custom-char-count';
		const { queryByText } = renderCharacterCount({ className });

		const componentEl = queryByText('0');
		expect(componentEl.classList.contains(className)).toBeTruthy();
	});

	it('Should pass `children` over `count`', () => {
		const testId = 'char-count-child';
		const count = 100;
		const children = <span data-testid={testId}>120</span>;
		const { queryByTestId, queryByText } = renderCharacterCount({ children, count });

		expect(queryByTestId(testId)).not.toBeNull();
		expect(queryByText(count)).toBeNull();
	});

	it('Should show an error state when `count` is smaller than `min` ', () => {
		const count = 20;
		const { queryByText } = renderCharacterCount({ count, min: 50 });

		const componentEl = queryByText(count);
		expect(componentEl.classList.contains('c-character-count--error')).toBeTruthy();
	});

	it('Should show an error state when `count` is greate than `max` ', () => {
		const count = 100;
		const { queryByText } = renderCharacterCount({ count, max: 80 });

		const componentEl = queryByText(count);
		expect(componentEl.classList.contains('c-character-count--error')).toBeTruthy();
	});

	it('Should show a warning state when `count` nears `min`', () => {
		const count = 35;
		const { queryByText } = renderCharacterCount({ count, min: 20, warningLimit: 20 });

		const componentEl = queryByText(count);
		expect(componentEl.classList.contains('c-character-count--warning')).toBeTruthy();
	});

	it('Should show a warning state when `count` nears `max`', () => {
		const count = 65;
		const { queryByText } = renderCharacterCount({ count, max: 80, warningLimit: 20 });

		const componentEl = queryByText(count);
		expect(componentEl.classList.contains('c-character-count--warning')).toBeTruthy();
	});

	it('Should not show a warning state when the count is not between min and max', () => {
		const count = 90;
		const { queryByText } = renderCharacterCount({
			count, min: 100, max: 200, warningLimit: 25,
		});

		const componentEl = queryByText(count);
		expect(componentEl.classList.contains('c-character-count--warning')).toBeFalsy();
	});
});
