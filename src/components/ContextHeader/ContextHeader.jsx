import { Badge, Tabs } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import React from 'react';

import { useSlot } from '../../hooks/useSlot';

import { headerPropTypes } from './ContextHeader.const';
import styles from './ContextHeader.module.scss';

export const ContextHeaderTopSection = ({ children }) => <>{children}</>;
export const ContextHeaderActionsSection = ({ children }) => <>{children}</>;

ContextHeaderActionsSection.propTypes = {
	children: React.children,
};

ContextHeaderTopSection.propTypes = {
	children: React.children,
};

const cx = classNames.bind(styles);

const ContextHeader = ({
	className,
	children,
	title,
	linkProps = (props) => props,
	badges = [],
	tabs = [],
}) => {
	const topSectionSlot = useSlot(ContextHeaderTopSection, children);
	const actionsSlot = useSlot(ContextHeaderActionsSection, children);

	const renderBadges = () => {
		if (badges && badges.length > 0) {
			return (
				<div>
					{
						badges.map((badge, index) => (
							// eslint-disable-next-line react/no-array-index-key
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
			return <Tabs linkProps={linkProps} align="left" items={tabs} />;
		}

		return null;
	};

	const classNameRoot = cx(className, 'u-bg-light', 'u-wrapper', 'o-context-header');
	const classNameTopSection = cx('o-context-header__top-section');
	const classNameBody = cx('o-context-header__body');
	const classNameBodyTitle = cx('o-context-header__body__title');

	return (
		<div className={classNameRoot}>
			<div className="u-container">
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

ContextHeader.propTypes = { ...headerPropTypes };

export default ContextHeader;
