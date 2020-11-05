import { PropTypes } from 'prop-types';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DndDragDroppable = ({
	accept, moveRow, index, children, id,
}) => {
	const dragDropRef = useRef(null);

	const [, drop] = useDrop({
		accept,
		hover(item, monitor) {
			if (!dragDropRef.current) {
				return;
			}

			const dragIndex = item.index;
			const hoverIndex = index;

			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}

			// Determine rectangle on screen
			const hoverBoundingRect = dragDropRef.current.getBoundingClientRect();
			// Get vertical middle
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// Determine mouse position
			const clientOffset = monitor.getClientOffset();
			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 0%
			// When dragging upwards, only move when the cursor is above 0%
			// Dragging downwards
			if (dragIndex < hoverIndex && (hoverClientY + hoverMiddleY) < hoverMiddleY) {
				return;
			}

			// Dragging upwards
			if (dragIndex > hoverIndex && (hoverClientY - hoverMiddleY) > hoverMiddleY) {
				return;
			}
			// Time to actually perform the action
			moveRow(dragIndex, hoverIndex);

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex; // eslint-disable-line
		},
	});

	const [{ isDragging }, drag] = useDrag({
		item: { type: accept, id, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	drag(drop(dragDropRef));

	return (
		<>
			{children({ dragDropRef, isDragging })}
		</>
	);
};

DndDragDroppable.propTypes = {
	accept: PropTypes.string,
	index: PropTypes.number,
	moveRow: PropTypes.func,
	children: PropTypes.func,
	id: PropTypes.any, // eslint-disable-line
};

export default DndDragDroppable;
