import React from 'react';

export function useSlot(type, children) {
	const slots = React.Children.toArray(children);
	const element = slots.find((c) => c && c.type === type);
	if (element && element.props.children) {
		return element.props.children;
	}
	return null;
}
