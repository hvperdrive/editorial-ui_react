import { Button } from '@acpaas-ui/react-components';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';

import { useSlot } from '../../hooks';

import { ControlledModalBody, ControlledModalFooter, ControlledModalHeader } from './ControlledModal.slots';

const ControlledModal = ({
	children, className, overlayClassName, node, onClose, show, size,
}) => {
	const headerSlot = useSlot(ControlledModalHeader, children);
	const bodySlot = useSlot(ControlledModalBody, children);
	const footerSlot = useSlot(ControlledModalFooter, children);

	return createPortal(
		<div className={classnames(overlayClassName, 'm-overlay', { 'is-active': show })}>
			<div
				className={classnames(className, 'm-modal', {
					'm-modal--large': size === 'large',
				})}
			>
				<div className="m-modal__content">
					{headerSlot || onClose ? (
						<div className="m-modal__header u-margin-bottom-xs">
							{headerSlot}
							{onClose && (
								<Button
									className="m-modal__close"
									icon="times"
									type="default"
									transparent
									onClick={onClose}
								/>
							)}
						</div>
					) : null}
					{footerSlot ? <div className="u-margin-bottom">{bodySlot}</div> : bodySlot}
					{footerSlot && <div className="m-modal__footer">{footerSlot}</div>}
				</div>
			</div>
		</div>,
		node || document.body,
	);
};

ControlledModal.propTypes = {
	className: PropTypes.string,
	overlayClassName: PropTypes.string,
	node: PropTypes.elementType,
	onClose: PropTypes.func,
	show: PropTypes.bool.isRequired,
	size: PropTypes.oneOf(['large']),
};

export default ControlledModal;
