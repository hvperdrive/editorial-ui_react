import { Select } from '@acpaas-ui/react-components';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Timepicker = ({
	id,
	className,
	required,
	value,
	hourLabel = 'Uren',
	minuteLabel = 'Minuten',
	hourPlaceholder = 'hh',
	minutePlaceholder = 'mm',
	hourOptions,
	minuteOptions,
	onChange,
}) => {
	/**
	* Methods
	*/
	const mapToObject = (items) => items.map((item) => ({
		key: item,
		value: item,
		label: item,
	}));

	const getFormattedTime = (dateString) => {
		if (!dateString || dateString.length === 0) {
			return null;
		}

		const date = new Date(dateString);
		return {
			hours: date.getHours().toString(),
			minutes: date.getMinutes().toString(),
		};
	};

	/**
	* Render
	*/
	return (
		<div className={classnames('a-timepicker', className)}>
			<Select
				id={`${id}-hours`}
				required={required}
				label={hourLabel}
				options={mapToObject(hourOptions)}
				placeholder={
						getFormattedTime(value || null)?.hours
						|| hourPlaceholder
				}
				onChange={onChange}
			/>
			<span className="a-timepicker__separator">:</span>
			<Select
				id={`${id}-minutes`}
				required={required}
				label={minuteLabel}
				options={mapToObject(minuteOptions)}
				placeholder={
						getFormattedTime(value || null)?.minutes
						|| minutePlaceholder
				}
				onChange={onChange}
			/>
		</div>
	);
};

Timepicker.propTypes = {
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
	required: PropTypes.bool,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	hourLabel: PropTypes.string,
	minuteLabel: PropTypes.string,
	hourPlaceholder: PropTypes.string,
	minutePlaceholder: PropTypes.string,
	hourOptions: PropTypes.arrayOf(PropTypes.string),
	minuteOptions: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func,
};

export default Timepicker;
