import { TextField } from '@acpaas-ui/react-components';
import PropTypes from 'prop-types';
import React from 'react';

const FilterItemText = ({ label }) => (
	<div>
		<TextField
			label={label}
			id={label}
			name={label}
			className="textfield-class"
			placeholder={`Zoeken op ${label}`}
			onChange={(value) => console.log('Filteren op:', value)}
			iconright="search"
		/>
	</div>
);

FilterItemText.propTypes = {
	label: PropTypes.string.isRequired,
};

export default FilterItemText;
