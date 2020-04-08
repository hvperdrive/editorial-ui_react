import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useSlot } from '../../hooks';

import styles from './ActionBar.module.scss';
import { ActionBarContentSection } from './ActionBar.slots';

const cx = classNames.bind(styles);

const ActionBar = ({
	children,
	container,
	disablePortal = false,
	isOpen,
}) => {
	const [mountNode, setMountNode] = useState(null);
	const contentSlot = useSlot(ActionBarContentSection, children);

	useEffect(() => {
		if (!disablePortal) {
			const node = container || document.body;
			setMountNode(node);
		}
	}, [container, disablePortal]);

	const renderActionBar = () => (isOpen ? (
		<div className={cx('o-action-bar')}>
			<div className="u-container">
				<div className="o-action-bar__content u-margin-top-xs u-margin-bottom-xs">
					{contentSlot}
				</div>
			</div>
		</div>
	) : null);

	return !disablePortal && mountNode
		? createPortal(renderActionBar(), mountNode)
		: renderActionBar();
};

ActionBar.propTypes = {
	children: PropTypes.node,
	container: PropTypes.node,
	disablePortal: PropTypes.bool,
	isOpen: PropTypes.bool.isRequired,
};

export default ActionBar;
