import arrayTreeFilter from 'array-tree-filter';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useLayoutEffect } from 'react';
import useDynamicRefs from 'use-dynamic-refs';

import { usePrevious } from '../../../hooks';
import { CasCaderOption } from '../Cascader';

const Menus = ({
	value = [],
	options = [],
	onSelect = () => null,
	isVisible = false,
}) => {
	/**
	 * Hooks
	 */
	const [getRef, setRef] = useDynamicRefs();
	const previousIsVisible = usePrevious(isVisible);

	/**
	 * Functions
	 */

	const getActiveOptions = (menuOptions = [], menuValue = []) => arrayTreeFilter(
		menuOptions,
		(option, level) => option.value === menuValue[level],
	);

	const getShowOptions = (menuOptions, menuValue) => getActiveOptions(menuOptions, menuValue)
		.map((menuOption) => menuOption.children)
		.filter((menuOption) => !!menuOption)
		.unshift(menuOptions);

	const isActiveOption = (menuValue, menuOption, menuIndex) => menuValue[menuIndex]
		=== menuOption.value;

	const scrollActiveItemToView = () => {
		// scroll into view
		const showOptions = getShowOptions(options, value);

		showOptions.forEach((option, index) => {
			const menuItemRef = getRef(index);

			if (menuItemRef && menuItemRef.parentElement) {
				menuItemRef.parentElement.scrollTop = menuItemRef.offsetTop;
			}
		});
	};

	useLayoutEffect(() => {
		scrollActiveItemToView();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useLayoutEffect(() => {
		if (!previousIsVisible && isVisible) {
			scrollActiveItemToView();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isVisible, previousIsVisible]);

	/**
	 * Render
	 */

	const renderExpandIconNode = (option) => {
		if (option.loading) {
			return null;
		}
		return <span className="o-cascade-menu-item-expand-icon">{'>'}</span>;
	};

	const renderLoadingIconNode = (option) => {
		if (!option.loading) {
			return null;
		}
		return <div className="a-spinner a-spinner--sm" role="alert" aria-busy="true" />;
	};

	const renderOption = (menuValue, option, menuIndex) => {
		const hasChildren = Array.isArray(option.children) && option.children.length > 0;
		const isNoLeaf = option.isLeaf === false;
		const isActive = isActiveOption(menuValue, option, menuIndex);
		const menuItemCls = classnames('o-cascade-menu-item', {
			'o-cascade-menu-item--expanded': hasChildren || isNoLeaf,
			'o-cascade-menu-item--active': isActive,
			'o-cascade-menu-item--disabled': option.disabled,
			'o-cascade-menu-item--loading': option.loading,
		});
		const refProps = isActive ? {
			ref: setRef(menuIndex),
		} : {};
		return (
			<li
				key={option.value}
				className={menuItemCls}
				titel={option.label}
				role="menuitem"
				onClick={(e) => onSelect(option, menuIndex, e)}
				onKeyDown={(e) => onSelect(option, menuIndex, e)}
				onMouseDown={(e) => e.preventDefault()}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...refProps}
			>
				{option.label}
				{renderExpandIconNode(option)}
				{renderLoadingIconNode(option)}
			</li>
		);
	};

	return (
		<div>
			{getShowOptions(options, value).map((menuOptions, menuIndex) => (
				<ul className="o-cascade-menu" key={menuIndex}>
					{menuOptions.map((menuOption) => renderOption(value, menuOption, menuIndex))}
				</ul>
			))}
		</div>
	);
};

Menus.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.arrayOf(PropTypes.number),
	]),
	options: PropTypes.arrayOf(CasCaderOption),
	onSelect: PropTypes.func,
	isVisible: PropTypes.bool,
};

export default Menus;
