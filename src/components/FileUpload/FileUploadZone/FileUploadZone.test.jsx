import { createEvent, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { NEVER, of } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { FileUploadDescription, FileUploadMessage } from '../FileUpload.slots';
import { Uploader } from '../Uploader';

import FileUploadZone from './FileUploadZone';

jest.mock('../Uploader');

const FileUploadDescriptionComponent = () => (<span data-testid="description" />);
const FileUploadMessageComponent = () => (<span data-testid="message" />);
const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

const renderFileUploadZone = (props, MessageComponent, DescriptionComponent) => {
	const defaultProps = {
		id: 'upload_id',
	};
	return render(
		<FileUploadZone {...defaultProps} {...props}>
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
		</FileUploadZone>,
	);
};

const fireFileUpload = (container, f) => {
	const fileInput = container.getElementsByTagName('input');
	fireEvent.change(fileInput[0],
		{
			target: {
				files: [f],
			},
		});
};

const fireFileUploadOnDrop = (container, f) => {
	const fileInput = container.getElementsByTagName('input')[0];
	const fileDropEvent = createEvent.drop(fileInput);
	const fileList = [f];

	Object.defineProperty(fileDropEvent, 'dataTransfer', {
		value: {
			files: fileList,
		},
	});

	fireEvent(fileInput, fileDropEvent);
};

describe('<FileUploadZone/>', () => {
	let uploader;
	beforeEach(() => {
		Uploader.mockClear();
		uploader = new Uploader();
	});

	describe('upload a file by clicking on the file upload zone', () => {
		describe('upload an invalid file', () => {
			it('should call the `invalidFiles` callback with the invalid files', () => {
				const invalidFiles = [
					{
						reasons: ['INVALID_FILE_TYPE'],
						file,
					},
				];
				uploader.validateFiles.mockReturnValueOnce({
					invalidFiles,
					validFiles: [],
				});
				const validateFilesSpy = jest.spyOn(uploader, 'validateFiles');
				const handleInvalidFiles = jest.fn();
				const { container } = renderFileUploadZone({
					uploader,
					invalidFiles: handleInvalidFiles,
				});
				fireFileUpload(container, file);
				expect(validateFilesSpy).toHaveBeenCalledWith([file]);
				expect(handleInvalidFiles).toHaveBeenCalledWith(invalidFiles);
			});
		});

		describe('upload a valid file', () => {
			const validFiles = [file];
			const uploadResponse = {
				file: {
					name: 'example.png',
				},
			};
			let validateFilesSpy;
			let uploadFilesSpy;

			beforeEach(() => {
				uploader.validateFiles.mockReturnValueOnce({
					invalidFiles: [],
					validFiles,
				});
				validateFilesSpy = jest.spyOn(uploader, 'validateFiles');
				uploadFilesSpy = jest.spyOn(uploader, 'uploadFiles');
			});

			it('should show the file name a progress bar when the file is uploading', () => {
				uploader.uploadFiles.mockReturnValueOnce(NEVER.pipe(startWith({
					progress: 0.5,
				})));
				const { container, queryByRole, queryByText } = renderFileUploadZone({
					uploader,
				});
				fireFileUpload(container, file);
				const progressBar = queryByRole('progressbar');
				const fileNode = queryByText('example.png');
				expect(fileNode).toBeDefined();
				expect(progressBar).toBeDefined();
				expect(progressBar.style.width).toBe('50%');
			});

			it('should call the `uploadedFiles`callback when the file has been successfully uploaded', () => {
				uploader.uploadFiles.mockReturnValueOnce(of({
					progress: 1,
					data: uploadResponse,
				}));
				const handleUploadedFiles = jest.fn();
				const { container } = renderFileUploadZone({
					uploader,
					uploadedFiles: handleUploadedFiles,
				});
				fireFileUpload(container, file);
				expect(validateFilesSpy).toHaveBeenCalledWith([file]);
				expect(uploadFilesSpy).toHaveBeenCalledWith(validFiles);
				expect(handleUploadedFiles).toHaveBeenCalledWith(uploadResponse);
			});
		});
	});

	describe('upload a file on drop', () => {
		it('should have the same behavior then when a user has clicked on the file input', () => {
			uploader.validateFiles.mockReturnValueOnce({
				invalidFiles: [],
				validFiles: [],
			});
			const validateFilesSpy = jest.spyOn(uploader, 'validateFiles');
			const { container } = renderFileUploadZone({
				uploader,
			});
			fireFileUploadOnDrop(container, file);
			expect(validateFilesSpy).toHaveBeenCalledWith([file]);
		});
	});

	describe('slots', () => {
		it('should show an upload message', () => {
			const { findByTestId } = renderFileUploadZone({
				uploader,
			}, FileUploadMessageComponent);
			const message = findByTestId('message');

			expect(message).toBeDefined();
		});

		it('should show a description text', () => {
			const { findByTestId } = renderFileUploadZone({
				uploader,
			}, FileUploadDescriptionComponent);
			const description = findByTestId('description');

			expect(description).toBeDefined();
		});
	});
});
