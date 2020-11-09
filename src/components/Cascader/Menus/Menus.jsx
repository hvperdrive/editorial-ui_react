import { Spinner } from '@acpaas-ui/react-components';
import arrayTreeFilter from 'array-tree-filter';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Menus = ({
	value = [],
	options = [],
	onSelect = () => null,
	prefixCls = 'o-cascader',
}) => {
	/**
	 * Functions
	 */

	const getActiveOptions = (menuOptions = [], menuValue = []) => arrayTreeFilter(
		menuOptions,
		(option, level) => option.value === menuValue[level],
	);

	const getShowOptions = (menuOptions, menuValue) => {
		const activeOptions = getActiveOptions(menuOptions, menuValue)
			.map((menuOption) => menuOption.children)
			.filter((menuOption) => !!menuOption);
		activeOptions.unshift(menuOptions);
		return activeOptions;
	};

	const isActiveOption = (menuValue, menuOption, menuIndex) => menuValue[menuIndex]
		=== menuOption.value;

	/**
	 * Render
	 */

	const renderExpandIconNode = (hasChildren, isNoLeaf, isLoading) => {
		if ((!hasChildren && !isNoLeaf) || isLoading) {
			return null;
		}
		return <span className={`${prefixCls}-menu-item-expand-icon fa fa-angle-right`} />;
	};

	const renderLoadingIconNode = (isLoading) => {
		if (!isLoading) {
			return null;
		}
		return <Spinner className="u-margin-left-xs" size="small" />;
	};

	const renderOption = (menuValue, option, menuIndex) => {
		const hasChildren = Array.isArray(option.children) && option.children.length > 0;
		const isNoLeaf = option.isLeaf === false;
		const isLoading = option.loading;
		const isActive = isActiveOption(menuValue, option, menuIndex);
		const menuItemCls = classnames(`${prefixCls}-menu-item`, {
			[`${prefixCls}-menu-item--expanded`]: hasChildren || isNoLeaf,
			[`${prefixCls}-menu-item--active`]: isActive,
			[`${prefixCls}-menu-item--disabled`]: option.disabled,
			[`${prefixCls}-menu-item--loading`]: isLoading,
		});
		return (
			<li
				key={`${option.value}-${menuIndex}`}
				className={menuItemCls}
				titel={option.label}
				role="menuitem"
				onClick={(e) => onSelect(option, menuIndex, e)}
				onKeyDown={(e) => onSelect(option, menuIndex, e)}
			>
				{option.label}
				{renderExpandIconNode(hasChildren, isNoLeaf, isLoading)}
				{renderLoadingIconNode(isLoading)}
			</li>
		);
	};

	return (
		<>
			{getShowOptions(options, value).map((menuOptions, menuIndex) => (
				<ul className={`${prefixCls}-menu`} key={`${menuIndex}`}>
					{menuOptions.map((menuOption) => renderOption(value, menuOption, menuIndex))}
				</ul>
			))}
		</>
	);
};

const CasCaderOption = PropTypes.shape({
	/**
	 * Value of the option
	 */
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	/**
	 * Human readable label
	 */
	label: PropTypes.node,
	/**
	 * True when loading
	 */
	loading: PropTypes.bool,
	/**
	 * Indicates the end of a cascader tree
	 */
	isLeaf: PropTypes.bool,
});

CasCaderOption.children = PropTypes.arrayOf(CasCaderOption);

Menus.propTypes = {
	prefixCls: PropTypes.string,
	/**
	 * Value
	 */
	value: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.arrayOf(PropTypes.number),
	]),
	/**
	 * Options
	 */
	options: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		label: PropTypes.node,
		loading: PropTypes.bool,
		isLeaf: PropTypes.bool,
		children: PropTypes.arrayOf(CasCaderOption),
	})),
	/**
	 * Callback when selecting an option
	 */
	onSelect: PropTypes.func,
};

export default Menus;
