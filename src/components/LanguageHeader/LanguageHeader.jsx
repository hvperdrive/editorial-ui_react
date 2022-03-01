import { Icon } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

import { ScrollableTabs } from '../ScrollableTabs';
import { Tooltip, TooltipTypeMap } from '../Tooltip';

import styles from './LanguageHeader.module.scss';

const cx = classNames.bind(styles);

const LanguageHeader = ({
	className,
	children,
	languages = [],
	tooltipText,
	onChangeLanguage,
}) => {
	const buttonRef = useRef(null);
	const [isVisible, setVisibility] = useState(false);

	const renderTabs = () => {
		if (languages && languages.length > 0) {
			return (
				<ScrollableTabs
					className={cx('o-language-header__tabs')}
					items={languages}
					tabStyle="button"
					onChange={onChangeLanguage}
				/>
			);
		}

		return null;
	};

	const classNameRoot = cx(className, 'u-bg-white', 'o-language-header');
	return (
		<div className={classNameRoot}>
			<div className={cx('o-language-header__top-section')}>
				{renderTabs()}
				{tooltipText && (
					<div>
						<button
							type="button"
							className="a-button a-button-transparent has-icon"
							ref={buttonRef}
							onMouseEnter={() => setVisibility(true)}
							onMouseLeave={() => setVisibility(false)}
						>
							<Icon name="globe" />

							<Tooltip
								isVisible={isVisible}
								targetRef={buttonRef}
								type={TooltipTypeMap.PRIMARY}
								placement="bottom-end"
							>
								{tooltipText}
							</Tooltip>
						</button>
					</div>
				)}
			</div>
			<div className={cx('o-language-header__form-section')}>
				{children}
			</div>
		</div>
	);
};

LanguageHeader.propTypes = {
	/**
	 * Class name that will be added to the root element
	 * of the component
	 */
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	/** languages, which are shown on the top of the component */
	languages: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			active: PropTypes.bool,
			disabled: PropTypes.bool,
		}),
	),
	tooltipText: PropTypes.string,
	onChangeLanguage: PropTypes.func,
};

export default LanguageHeader;
