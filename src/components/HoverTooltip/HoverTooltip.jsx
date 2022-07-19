import PropTypes from 'prop-types';
import React, { useCallback, useRef, useState } from 'react';

import { Tooltip, TooltipSizeMap, TooltipTypeMap } from '../Tooltip';

const HoverTooltip = ({
	children,
	style,
	className,
	value,
	type = TooltipTypeMap.PRIMARY,
	size = TooltipSizeMap.NORMAL,
	placement = 'bottom-start',
	delayShow = 700,
}) => {
	const targetRef = useRef(null);
	const [isVisible, setVisibility] = useState(false);
	const [delayShowLoop, setDelayShowLoop] = useState(null);

	const handleMouseEnter = () => {
		setDelayShowLoop(setTimeout(() => {
			setVisibility(true);
		}, parseInt(delayShow, 10)));
	};

	const handleMouseLeave = useCallback(
		() => {
			if (delayShowLoop) {
				clearTimeout(delayShowLoop);
			}
			setVisibility(false);
		},
		[delayShowLoop],
	);

	return (
		<>
			<div
				style={style}
				ref={targetRef}
				className={className}
			>
				<div
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					{children}
				</div>
			</div>
			<Tooltip
				type={type}
				size={size}
				placement={placement}
				isVisible={isVisible}
				targetRef={targetRef}
			>
				{value}
			</Tooltip>
		</>
	);
};

HoverTooltip.propTypes = {
	className: PropTypes.string,
	value: PropTypes.string,
	placement: PropTypes.string,
	children: PropTypes.node.isRequired,
	style: PropTypes.shape(),
	type: PropTypes.oneOf([TooltipTypeMap.DEFAULT, TooltipTypeMap.PRIMARY, TooltipTypeMap.SECONDARY]),
	size: PropTypes.oneOf([TooltipSizeMap.NORMAL, TooltipSizeMap.SMALL]),
	delayShow: PropTypes.number,
};

export default HoverTooltip;
