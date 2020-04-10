import { Tabs } from '@acpaas-ui/react-components';
import classnames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, {
	useCallback, useEffect, useRef, useState,
} from 'react';

import styles from './ScrollableTabs.module.scss';

const cx = classnames.bind(styles);

const ScrollableTabs = ({ className, items = [], linkProps = (props) => props }) => {
	/**
	 * Hooks
	 */
	const hasInitialised = useRef(false);
	const scrollContainerRef = useRef(null);
	const tabsRef = useRef(null);
	const [tabsHeight, setTabsHeight] = useState();
	const [showLeftGradient, setShowLeftGradient] = useState(false);
	const [showRightGradient, setShowRightGradient] = useState(false);

	// Hide horizontal scrollbar
	useEffect(() => {
		if (scrollContainerRef.current) {
			const tabsEl = scrollContainerRef.current.querySelector('.m-nav-tabs');
			tabsRef.current = tabsEl;
			setTabsHeight(tabsEl.clientHeight);
		}
	}, []);

	// TODO: Set active tab visible in scroll area

	// Set gradients to indicate it's scrollable
	const setGradients = useCallback((element) => {
		if (!element) {
			return;
		}

		const containerEnd = Math.round(element.clientWidth);
		const leftOffset = Math.round(element.scrollLeft);
		const rightOffset = Math.round(element.scrollWidth - leftOffset);
		const showLeft = leftOffset > 0;
		const showRight = rightOffset > containerEnd;

		if (showLeft !== showLeftGradient) {
			setShowLeftGradient(showLeft);
		}
		if (showRight !== showRightGradient) {
			setShowRightGradient(showRight);
		}
	}, [showLeftGradient, showRightGradient]);

	const onTabsScroll = useCallback((e) => {
		setGradients(e.target);
	}, [setGradients]);

	// Set scroll listener
	useEffect(() => {
		const tabsEl = tabsRef.current;

		if (tabsEl) {
			tabsEl.addEventListener('scroll', onTabsScroll);
		}

		return () => {
			if (tabsEl) {
				tabsEl.removeEventListener('scroll', onTabsScroll);
			}
		};
	}, [onTabsScroll]);

	// Set initial values
	useEffect(() => {
		if (!hasInitialised.current && tabsRef.current) {
			setGradients(tabsRef.current);
			hasInitialised.current = true;
		}
	}, [setGradients]);

	/**
	 * Render
	 */
	return (
		<div
			className={cx(className, 'o-scrollable-tabs', {
				'o-scrollable-tabs--gradient-left': showLeftGradient,
				'o-scrollable-tabs--gradient-right': showRightGradient,
			})}
			ref={scrollContainerRef}
			style={{ height: `${tabsHeight}px` }}
		>
			<Tabs items={items} linkProps={linkProps} />
		</div>
	);
};

ScrollableTabs.propTypes = {
	className: PropTypes.string,
	items: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		target: PropTypes.string.isRequired,
		active: PropTypes.bool,
		disabled: PropTypes.bool,
	})),
	linkProps: PropTypes.func,
};

export default ScrollableTabs;
