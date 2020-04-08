import { Badge, Tabs } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import { useSlot } from '../../hooks';

import styles from './ContextHeader.module.scss';
import { ContextHeaderActionsSection, ContextHeaderTopSection } from './ContextHeader.slots';

const cx = classNames.bind(styles);

const ContextHeader = ({
	className,
	children,
	title = '',
	linkProps = (props) => props,
	badges = [],
	tabs = [],
}) => {
	const topSectionSlot = useSlot(ContextHeaderTopSection, children);
	const actionsSlot = useSlot(ContextHeaderActionsSection, children);

	const renderBadges = () => {
		if (badges && badges.length > 0) {
			return (
				<div className="o-context-header__badges">
					{
						badges.map((badge, index) => (
							<Badge className="u-margin-right-xs u-margin-top-xs u-margin-bottom-xs" key={index} type={badge.type}>
								{badge.name}
							</Badge>
						))
					}
				</div>
			);
		}

		return null;
	};

	const renderTabs = () => {
		if (tabs && tabs.length > 0) {
			return <Tabs className="o-context-header__tabs" linkProps={linkProps} align="left" items={tabs} />;
		}

		return null;
	};

	const classNameRoot = cx(className, 'u-bg-light', 'o-context-header');
	const classNameTopSection = cx('o-context-header__top-section');
	const classNameBody = cx('o-context-header__body');
	const classNameBodyTitle = cx('o-context-header__body__title');

	return (
		<div className={classNameRoot}>
			<div className="u-container u-wrapper">
				{
					topSectionSlot && (
						<div className={classNameTopSection}>
							{topSectionSlot}
						</div>
					)
				}
				<div className={classNameBody}>
					<div className={classNameBodyTitle}>
						<h1 className="u-margin-right-xs">{title}</h1>
						{renderBadges()}
					</div>
					{
						actionsSlot && (
							<div>
								{actionsSlot}
							</div>
						)
					}
				</div>
				{ renderTabs() }
			</div>
		</div>
	);
};

ContextHeader.propTypes = {
	/**
	 * Class name that will be added to the root element
	 * of the component
	 */
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	title: PropTypes.string.isRequired,
	/** Badges, which are shown on the right side of the title */
	badges: PropTypes.arrayOf(PropTypes.shape({
		type: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger']).isRequired,
		name: PropTypes.string.isRequired,
	})),
	/** tabs, which are shown on the bottom of the component */
	tabs: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		target: PropTypes.string.isRequired,
		active: PropTypes.bool,
		disabled: PropTypes.bool,
	})),
	/**
	 * Use this to pass a custom link-component to override the default <a> tag used inside the tabs
	 * */
	linkProps: PropTypes.func,
};

export default ContextHeader;
