import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import FileUpload from './FileUpload';
import { FileUploadDescription, FileUploadMessage } from './FileUpload.slots';

const FileUploadDescriptionComponent = () => (<span data-testid="description" />);
const FileUploadMessageComponent = () => (<span data-testid="message" />);

const renderFileUpload = (props, MessageComponent, DescriptionComponent) => {
	const defaultProps = {
		id: 'upload-field',
	};
	return render(
		<FileUpload {...defaultProps} {...props}>
			{ MessageComponent && (
				<FileUploadMessage>
					<MessageComponent />
				</FileUploadMessage>
			)}

			{
				DescriptionComponent && (
					<FileUploadDescription>
						<DescriptionComponent />
					</FileUploadDescription>
				)
			}
		</FileUpload>,
	);
};

describe('<FileUpload/>', () => {
	describe('File list', () => {
		const files = [
			{
				name: 'file 1',
				id: '1',
			},
		];

		it('should show the uploaded files in a list', () => {
			const { queryByText } = renderFileUpload({
				files,
			});
			const fileNameNode = queryByText(files[0].name);
			expect(fileNameNode).toBeDefined();
		});

		it('should call the `removeFile` callback when the user has clicked on the delete file button', () => {
			const removeFileSpy = jest.fn();
			const { container } = renderFileUpload({
				files,
				removeFile: removeFileSpy,
			});
			const removeButton = container.getElementsByTagName('button')[0];
			fireEvent.click(removeButton);
			expect(removeFileSpy).toHaveBeenCalledWith(files[0].id, 0);
		});
	});

	it('should disable the file upload zone when the fileLimit is reached', () => {
		const { container } = renderFileUpload({
			files: [
				{
					name: 'file 1',
					id: '1',
				},
			],
			options: {
				fileLimit: 1,
			},
		});
		const fileInput = container.getElementsByTagName('input')[0];
		expect(fileInput.disabled).toBeTruthy();
	});

	describe('slots', () => {
		it('should show an upload message', () => {
			const { findByTestId } = renderFileUpload({}, FileUploadMessageComponent);
			const message = findByTestId('message');

			expect(message).toBeDefined();
		});

		it('should show a description text', () => {
			const { findByTestId } = renderFileUpload({}, FileUploadDescriptionComponent);
			const description = findByTestId('description');

			expect(description).toBeDefined();
		});
	});
});
