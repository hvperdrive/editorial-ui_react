import { PropTypes } from 'prop-types';
import React, { useRef } from 'react';
import { createDndContext, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DNDContext = createDndContext(HTML5Backend);

const DndContainer = ({ draggable, children }) => {
	const manager = useRef(DNDContext);

	if (!draggable) {
		return children;
	}

	return (
		<DndProvider manager={manager.current.dragDropManager}>
			{children}
		</DndProvider>
	);
};

DndContainer.propTypes = {
	draggable: PropTypes.bool,
	children: PropTypes.node,
};

export default DndContainer;
