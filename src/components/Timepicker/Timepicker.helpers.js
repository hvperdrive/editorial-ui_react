export const setInitialValues = (index) => {
	const initialValues = [];

	for (let i = 1; i < index; i += 1) {
		initialValues.push('');
	}

	return initialValues;
};

const SINGLE_DIGIT_REGEX = /^\d$/;
const isSingleDigit = (numberString) => SINGLE_DIGIT_REGEX.test(numberString);
const getTimeOptionLabel = (value, addLeadingZero = false) => {
	const valueString = value.toString();

	if (!addLeadingZero) {
		return valueString;
	}

	return isSingleDigit(valueString) ? `0${valueString}` : valueString;
};

export const generateTimeSelectOptions = (
	amount, step, disabled = false, addLeadingZero = false,
) => {
	const a = [];
	let b = 0;
	while (b < amount) {
		a.push({
			key: b,
			value: b,
			label: getTimeOptionLabel(b, addLeadingZero),
			disabled,
		});
		b += step;
	}
	return a;
};

export const getTimeArray = (timeString) => {
	if (!timeString || timeString === '') {
		return [];
	}

	return timeString.split(':');
};

export const getTimeString = (timeArray) => timeArray.join(':');
