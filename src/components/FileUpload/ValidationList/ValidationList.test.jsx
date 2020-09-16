import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { VALIDATION_MESSAGES_DEFAULT } from '../FileUpload.const';

import ValidationList from './ValidationList';

const renderValidationList = (props) => render((
	<ValidationList {...props} />
));

describe('<ValidationList/>', () => {
	const date = new Date();
	const invalidFiles = [{
		reasons: ['INVALID_FILE_TYPE', 'INVALID_FILE_SIZE', 'INVALID_MIME_TYPE'],
		file: new File(['a'], 'filename.jpg', { type: 'image/jpeg', lastModified: date.getTime() }),
	}];
	const messages = {
		INVALID_FILE_TYPE: 'invalid file type message',
		INVALID_FILE_SIZE: 'invalid file size message',
		INVALID_MIME_TYPE: 'invalid mine type message',
	};

	it('should render a list with invalid files', () => {
		const { container, queryByText } = renderValidationList({
			invalidFiles,
			messages,
		});

		const items = container.querySelectorAll('li');
		const file = queryByText('filename.jpg');
		const invalidFileTypeMessage = queryByText(messages.INVALID_FILE_TYPE);
		const invalidFileSizeMessage = queryByText(messages.INVALID_FILE_SIZE);
		const invalidMineTypeMessage = queryByText(messages.INVALID_MIME_TYPE);
		expect(items).toBeDefined();
		expect(items.length).toBe(1);
		expect(file).toBeDefined();
		expect(invalidFileTypeMessage).toBeDefined();
		expect(invalidFileSizeMessage).toBeDefined();
		expect(invalidMineTypeMessage).toBeDefined();
	});

	it('should call the removeInvalidFile', (cb) => {
		const removeInvalidFile = (index) => {
			expect(index).toBe(0);
			cb();
		};
		const { container } = renderValidationList({
			invalidFiles,
			messages,
			removeInvalidFile,
		});
		const button = container.querySelector('button');
		fireEvent.click(button);
	});

	it('should set the aria remove label', () => {
		const ariaLabelRemove = 'Verwijder file';
		const { getByLabelText } = renderValidationList({
			invalidFiles,
			messages,
			ariaLabelRemove,
		});
		const ariaLabel = getByLabelText(ariaLabelRemove);
		expect(ariaLabel).toBeDefined();
	});

	it('should use the default validation message when there is no message set', () => {
		const ariaLabelRemove = 'Verwijder file';
		const { queryByText } = renderValidationList({
			invalidFiles,
			messages: {},
			ariaLabelRemove,
		});
		const invalidFileTypeMessage = queryByText(VALIDATION_MESSAGES_DEFAULT.INVALID_FILE_TYPE);
		expect(invalidFileTypeMessage).toBeDefined();
	});
});
