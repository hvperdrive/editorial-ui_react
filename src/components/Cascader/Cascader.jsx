import arrayTreeFilter from 'array-tree-filter';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import React, { useEffect, useRef, useState } from 'react';

import { KeyCode } from '../../helpers';

import { BUILT_IN_PLACEMENTS } from './Cascader.const';
import { Menus } from './Menus';
import './Cascader.scss';

const Cascader = ({
	defaultValue,
	value,
	options,
	disabled = false,
	changeOnSelect = false,
	children,
	prefixCls = 'o-cascader',
	onChange = () => null,
	loadData = () => null,
}) => {
	const [popupVisible, setPopupVisible] = useState(false);
	const [activeValue, setActiveValue] = useState(defaultValue ?? []);
	const triggerEl = useRef(null);

	/**
	 * Hooks
	 */
	useEffect(() => {
		if (Array.isArray(value)) {
			setActiveValue(value);
		}
	}, [value]);

	/**
	 * Functions
	 */
	const getActiveOptions = (cascadeOptions = [], cascadeActiveValue = []) => arrayTreeFilter(
		cascadeOptions,
		(option, level) => option.value === cascadeActiveValue[level],
	);

	const getCurrentLevelOptions = () => {
		if (!Array.isArray(options) || !Array.isArray(activeValue)) {
			return [];
		}
		const result = getActiveOptions(options, activeValue);

		if (result[result.length - 2]) {
			return result[result.length - 2].children;
		}
		return options.filter((o) => !o.disabled);
	};

	const getNextIndex = (currentOptions, currentIndex, e) => {
		if (currentIndex === -1) {
			return 0;
		}
		const nextIndexDown = currentIndex + 1;
		const nextIndexUp = currentIndex - 1;

		if (e.keyCode === KeyCode.DOWN) {
			return nextIndexDown >= currentOptions.length ? 0 : nextIndexDown;
		}

		return nextIndexUp < 0 ? currentOptions.length - 1 : nextIndexUp;
	};

	const handleChange = (activeOptions, visible, e) => {
		if (e.type !== 'keydown' || e.keyCode === KeyCode.ENTER) {
			onChange(activeOptions.map((activeOption) => activeOption.value), activeOptions);
			setPopupVisible(visible);
		}
	};

	const handleMenuSelect = (targetOption, menuLevel, e) => {
		const triggerNode = triggerEl.current.getRootDomNode();
		if (triggerNode && triggerNode.focus) {
			triggerNode.focus();
		}

		if (!targetOption || targetOption.disabled) {
			return;
		}

		const newActiveValue = activeValue.slice(0, menuLevel + 1);
		newActiveValue[menuLevel] = targetOption.value;
		const activeOptions = getActiveOptions(options, newActiveValue);

		/**
		 * When the targetOption is not a leaf and it has no children
		 * It must have a loadData function to lazy load the children
		 */
		if (targetOption.isLeaf === false && !targetOption.children && loadData) {
			// Call the onchange function on evry select when change on select is set to
			// true
			if (changeOnSelect) {
				handleChange(activeOptions, true, e);
			}
			setActiveValue(newActiveValue);
			loadData(activeOptions, menuLevel);
			return;
		}

		// check if the target option is a leaf
		if (
			!targetOption.children
			|| !targetOption.children.length
			|| targetOption.children.length === 0
		) {
			// close popup and handle change
			handleChange(activeOptions, false, e);
		} else if (changeOnSelect && (e.type === 'click' || e.type === 'keydown')) {
			// handle change on every select
			handleChange(activeOptions, true, e);
		}
		setActiveValue(newActiveValue);
	};

	const handleKeyDown = (e) => {
		// Only hanlde the keys listed underneath
		if (
			e.keyCode !== KeyCode.DOWN
			&& e.keyCode !== KeyCode.UP
			&& e.keyCode !== KeyCode.ENTER
			&& e.keyCode !== KeyCode.SPACE
			//
			&& e.keyCode !== KeyCode.LEFT
			&& e.keyCode !== KeyCode.RIGHT
			&& e.keyCode !== KeyCode.BACKSPACE
			&& e.keyCode !== KeyCode.ESC
			&& e.keyCode !== KeyCode.TAB
		) {
			return;
		}

		// Reopen the popup when the user hits one of the keys
		// listed underneath
		if (
			!popupVisible
			&& (e.keyCode === KeyCode.DOWN
			|| e.keyCode === KeyCode.UP
			|| e.keyCode === KeyCode.ENTER
			|| e.keyCode === KeyCode.SPACE)
		) {
			// open the popup and do nothing else
			setPopupVisible(true);
			return;
		}

		/**
		 * Key functionality when the popup is open.
		 * The user can navigate through the cascade by using a set of key strokes
		 */
		const events = {
			isGoingUpOrDown: e.keyCode === KeyCode.DOWN || e.keyCode === KeyCode.UP,
			isGoingLeft: e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.BACKSPACE,
			isGoingRight: e.keyCode === KeyCode.RIGHT,
			isLoosingFocus: e.keyCode === KeyCode.ESC || e.keyCode === KeyCode.TAB,
		};
		const newActiveValue = [...activeValue];
		const currentLevel = newActiveValue.length - 1 < 0 ? 0 : newActiveValue.length - 1;
		const currentOptions = getCurrentLevelOptions();
		const currentIndex = currentOptions
			.map((option) => option.value).indexOf(newActiveValue[currentLevel]);

		if (events.isGoingUpOrDown) {
			e.preventDefault();
			const nextIndex = getNextIndex(currentOptions, currentIndex, e);
			newActiveValue[currentLevel] = currentOptions[nextIndex].value;
		} else if (events.isGoingLeft) {
			e.preventDefault();
			newActiveValue.splice(newActiveValue.length - 1, 1);
		} else if (events.isGoingRight) {
			e.preventDefault();
			if (currentOptions[currentIndex] && currentOptions[currentIndex].children) {
				newActiveValue.push(
					currentOptions[currentIndex].children[0].value,
				);
			}
		} else if (events.isLoosingFocus) {
			setPopupVisible(false);
			return;
		}

		if (newActiveValue.length === 0) {
			setPopupVisible(false);
		}

		const activeOptions = getActiveOptions(options, newActiveValue);
		const targetOption = activeOptions[activeOptions.length - 1];

		handleMenuSelect(targetOption, activeOptions.length - 1, e);
	};

	/**
	 * Render
	 */

	const renderPopupNode = () => {
		if (!Array.isArray(options) || options.length === 0) {
			return null;
		}

		return (
			<Menus
				value={activeValue}
				onSelect={handleMenuSelect}
				options={options}
			/>
		);
	};

	return (
		<Trigger
			ref={triggerEl}
			popupPlacement="bottomLeft"
			builtinPlacements={BUILT_IN_PLACEMENTS}
			action={disabled ? [] : ['click']}
			popupVisible={disabled ? false : popupVisible}
			onPopupVisibleChange={setPopupVisible}
			prefixCls={`${prefixCls}-menus`}
			popup={renderPopupNode()}
		>
			{React.cloneElement(children, {
				onKeyDown: handleKeyDown,
				tabIndex: disabled ? undefined : 0,
			})}
		</Trigger>
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

Cascader.propTypes = {
	/**
	 * Component class prefix
	 */
	prefixCls: PropTypes.string,
	/**
	 * Default value
	 */
	defaultValue: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.arrayOf(PropTypes.number),
	]),
	/**
	 * Value
	 */
	value: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.arrayOf(PropTypes.number),
	]),
	/**
	 * Cascader options
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
	 * Change the value on each selection, by default it will only
	 * trigger the onchange event when selecting a leaf option
	 */
	changeOnSelect: PropTypes.bool,
	/**
	 * Callback when finisching the cascader select
	 */
	onChange: PropTypes.func,
	/**
	 * Lazy load children
	 */
	loadData: PropTypes.func,
	/**
	 * Selecting an option is not possible when disabled
	 */
	disabled: PropTypes.bool,
	children: PropTypes.element,
};

export default Cascader;
