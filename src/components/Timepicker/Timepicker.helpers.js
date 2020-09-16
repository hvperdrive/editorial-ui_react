export const setInitialValues = (index) => {
	const initialValues = [];

	for (let i = 1; i < index; i += 1) {
		initialValues.push('');
	}

	return initialValues;
};

export const mapToObject = (amount, step, disabled = false) => {
	const a = [];
	let b = 0;
	while (b < amount) {
		a.push({
			key: b,
			value: b,
			label: b,
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
