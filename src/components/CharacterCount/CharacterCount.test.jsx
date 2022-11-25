import { render } from '@testing-library/react';
import React from 'react';

import CharacterCount from './CharacterCount';

const renderCharacterCount = (props) => render(<CharacterCount {...props} />);

describe('<CharacterCount />', () => {
	it('Should not render when min and max are undefined', () => {
		const className = 'custom-char-count';
		const { container } = renderCharacterCount({ className });

		expect(container.firstChild).toEqual(null);
	});

	it('Should pass `children` over `count`', () => {
		const testId = 'char-count-child';
		const count = 100;
		const children = <span data-testid={testId}>120</span>;
		const { queryByTestId, queryByText } = renderCharacterCount({ children, count });

		expect(queryByTestId(testId)).not.toBeNull();
		expect(queryByText(count)).toBeNull();
	});

	it('Should render min value', () => {
		const count = 20;
		const { queryByText } = renderCharacterCount({ count, min: 50 });

		const componentEl = queryByText('(min 50)');
		expect(componentEl).toBeTruthy();
	});

	it('Should render max value', () => {
		const count = 20;
		const { queryByText } = renderCharacterCount({ count, max: 50 });

		const componentEl = queryByText('(max 50)');
		expect(componentEl).toBeTruthy();
	});

	it('Should render min and max value', () => {
		const count = 20;
		const { queryByText } = renderCharacterCount({ count, min: 20, max: 50 });

		const componentEl = queryByText('(20 tot 50)');
		expect(componentEl).toBeTruthy();
	});
});
