import { render } from '@testing-library/react';
import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { dragAndDrop } from '../Dnd.helpers';

import DndContainer from './DndContainer';

const dragTestId = 'drag';
const dropTestId = 'drop';

const DraggableComponent = () => {
	const [, dragRef] = useDrag({ item: { id: 1, type: 'item' } });
	return <div data-testid={dragTestId} ref={dragRef}>Drag me</div>;
};
const DropTarget = () => {
	const [label, setLabel] = useState('Drop target');
	const [, dropRef] = useDrop({
		accept: 'item',
		drop: (item) => {
			if (item) {
				setLabel('Dropped');
			}
		},
	});
	return <div data-testid={dropTestId} ref={dropRef}>{label}</div>;
};

const renderDndContainer = ({ draggable = true } = {}) => render(
	<DndContainer draggable={draggable}>
		<DraggableComponent />
		<DropTarget />
	</DndContainer>,
);

describe('<DndContainer />', () => {
	it('Should use DndProvider when `draggable` is true', () => {
		const { queryByTestId } = renderDndContainer();
		const dragEl = queryByTestId(dragTestId);
		const dropEl = queryByTestId(dropTestId);

		dragAndDrop(dragEl, dropEl);

		expect(queryByTestId(dropTestId).textContent).toBe('Dropped');
	});

	it('Should throw an error when using Dnd context when `draggable` is false', () => {
		expect(() => renderDndContainer({ draggable: false })).toThrowError();
	});

	it('Should render children', () => {
		const { queryByTestId } = renderDndContainer();
		const dragEl = queryByTestId(dragTestId);
		const dropEl = queryByTestId(dropTestId);

		expect(dragEl).not.toBeNull();
		expect(dropEl).not.toBeNull();
	});
});
