import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

import { Tooltip, TooltipTypeMap } from '../Tooltip';

const EllipsisWithTooltip = ({
	children,
	style,
	type,
}) => {
	const targetRef = useRef(null);
	const [isVisible, setVisibility] = useState(false);
	return (
		<>
			<div
				style={style}
				className="u-text-truncate"
				ref={targetRef}
				onMouseEnter={() => setVisibility(true)}
				onMouseLeave={() => setVisibility(false)}
			>
				{children}
			</div>
			<Tooltip type={type} isVisible={isVisible} targetRef={targetRef}>{children}</Tooltip>
		</>
	);
};

EllipsisWithTooltip.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	style: PropTypes.shape(),
	type: PropTypes.oneOf([TooltipTypeMap.PRIMARY, TooltipTypeMap.SECONDARY]),
};

export default EllipsisWithTooltip;
