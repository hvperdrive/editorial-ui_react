/* eslint-disable react/jsx-props-no-spreading */
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, {
	useEffect, useMemo, useRef, useState,
} from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';

import { TooltipTypeMap } from './Tooltip.const';
import './Tooltip.scss';

const Tooltip = ({
	children,
	className,
	targetRef,
	container,
	isVisible,
	type = TooltipTypeMap.DEFAULT,
	disablePortal = false,
	placement = 'bottom-start',
}) => {
	const tooltipClasses = classnames(className, 'a-tooltip', 'a-tooltip--no-arrow', {
		'a-tooltip--primary': type === TooltipTypeMap.PRIMARY,
		'a-tooltip--secondary': type === TooltipTypeMap.SECONDARY,
		'a-tooltip--white': type === TooltipTypeMap.WHITE,
	});
	const [mountNode, setMountNode] = useState(null);
	const popperElement = useRef(null);
	const [arrowRef, setArrowRef] = useState(null);

	useEffect(() => {
		if (!disablePortal) {
			const node = container || document.body;
			setMountNode(node);
		}
	}, [container, disablePortal]);

	const popperOptions = useMemo(
		() => ({
			placement,
			modifiers: [
				{
					name: 'offset',
					options: {
						offset: [0, 10],
					},
				},
				{
					name: 'arrow',
					options: {
						element: arrowRef,
					},
				},
			],
		}),
		[arrowRef, placement],
	);

	const { styles, attributes } = usePopper(
		targetRef.current,
		popperElement.current,
		popperOptions,
	);

	if (!isVisible) return null;

	const renderTooltip = () => (isVisible ? (
		<div
			className={tooltipClasses}
			style={styles.popper}
			ref={popperElement}
			{...attributes.popper}
		>
			<div ref={setArrowRef} className="arrow">
				{type === TooltipTypeMap.WHITE && <div className="innerArrow" />}
			</div>
			{children}
		</div>
	) : null);

	return !disablePortal && mountNode
		? createPortal(renderTooltip(), mountNode)
		: renderTooltip();
};

Tooltip.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	className: PropTypes.string,
	type: PropTypes.oneOf([
		TooltipTypeMap.DEFAULT,
		TooltipTypeMap.PRIMARY,
		TooltipTypeMap.SECONDARY,
		TooltipTypeMap.WHITE,
	]),
	targetRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
	]).isRequired,
	isVisible: PropTypes.bool.isRequired,
	disablePortal: PropTypes.bool,
	container: PropTypes.node,
	placement: PropTypes.string,
};

export default Tooltip;
