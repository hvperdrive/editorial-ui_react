import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_UNIT_AMOUNTS } from './Timepicker.const';
import {
	getTimeArray,
	getTimeString,
} from './Timepicker.helpers';
import './Timepicker.scss';

const Timepicker = ({
	id,
	className,
	required,
	disabled = false,
	value,
	label = 'Tijd',
	description,
	// eslint-disable-next-line no-unused-vars
	hourStep = 1,
	// eslint-disable-next-line no-unused-vars
	minuteStep = 5,
	onChange,
}) => {
	const timeArray = getTimeArray(value, TIME_UNIT_AMOUNTS) || [];
	let timeString = getTimeString(timeArray);
	/**
	 * Methods
	 */
	const handleChange = (indexValue) => {
		timeString = indexValue;

		onChange(indexValue);
	};
	/**
	 * Render
	 */
	return (
		<div className={classnames('a-input a-timepicker', className)}>
			<label className="a-input__label" htmlFor="time-field">
				{label}
			</label>
			<input
				type="time"
				name="time-field"
				id={id}
				value={timeString || '00:00'}
				aria-describedby="time-field-description"
				onChange={(event) => handleChange(event.target.value)}
				required={required}
				disabled={disabled}
			/>
			<small id="time-field-description">{description}</small>
		</div>
	);
};

Timepicker.propTypes = {
	label: PropTypes.string,
	description: PropTypes.string,
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	hourStep: PropTypes.number,
	minuteStep: PropTypes.number,
	onChange: PropTypes.func,
};

export default Timepicker;
