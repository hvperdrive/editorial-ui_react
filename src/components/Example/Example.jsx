import PropTypes from 'prop-types';
import React from 'react';

const Example = ({ onClick, text = 'Hello world!' }) => (
	<div>
		<p>{text}</p>
		<button onClick={onClick}>Click me</button>
	</div>
);

Example.propTypes = {
	onClick: PropTypes.func.isRequired,
	text: PropTypes.string,
};

export default Example;
