import { Button } from '@acpaas-ui/react-components';
import classnames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';

import { useSlot } from '../../hooks';

import styles from './ControlledModal.module.scss';
import {
	ControlledModalBody, ControlledModalFooter, ControlledModalHeader,
} from './ControlledModal.slots';

const cx = classnames.bind(styles);

const ControlledModal = ({
	children, className, overlayClassName, lockBodyScroll = true, node, onClose, show, size,
}) => {
	/**
	 * Hooks
	 */

	const headerSlot = useSlot(ControlledModalHeader, children);
	const bodySlot = useSlot(ControlledModalBody, children);
	const footerSlot = useSlot(ControlledModalFooter, children);

	useEffect(() => {
		if (!lockBodyScroll) {
			return;
		}

		if (show) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [lockBodyScroll, show]);

	/**
	 * Methods
	 */

	const showSlots = headerSlot || bodySlot || footerSlot;

	/**
	 * Render
	 */

	const renderCloseButton = () => onClose && (
		<Button
			className="m-modal__close"
			icon="times"
			type="default"
			transparent
			onClick={onClose}
		/>
	);

	return createPortal(
		<div className={classnames(overlayClassName, 'm-overlay', { 'is-active': show })}>
			<div
				className={classnames(className, 'm-modal', {
					'm-modal--large': size === 'large',
				})}
			>
				{showSlots ? (
					<div className="m-modal__content">
						{headerSlot || onClose ? (
							<div className="m-modal__header u-margin-bottom-xs">
								{headerSlot}
								{renderCloseButton()}
							</div>
						) : null}
						{footerSlot ? <div className="u-margin-bottom">{bodySlot}</div> : bodySlot}
						{footerSlot && <div className="m-modal__footer">{footerSlot}</div>}
					</div>
				) : (
					<div className={cx('m-controlled-modal__content')}>
						<div>
							{renderCloseButton()}
						</div>
						{children}
					</div>
				)}
			</div>
		</div>,
		node || document.body,
	);
};

ControlledModal.propTypes = {
	className: PropTypes.string,
	overlayClassName: PropTypes.string,
	node: PropTypes.instanceOf(Element),
	onClose: PropTypes.func,
	show: PropTypes.bool.isRequired,
	size: PropTypes.oneOf(['large']),
	lockBodyScroll: PropTypes.bool,
};

export default ControlledModal;
