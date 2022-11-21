import classnames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './CharacterCount.module.scss';

const cx = classnames.bind(styles);

const CharacterCount = ({
	className, children, count = 0, min, max, warningLimit,
}) => {
	const clx = cx(className, 'c-character-count', {
		'c-character-count--error': count < min || count > max,
		'c-character-count--warning': warningLimit && ((count > min && count < min + warningLimit) || (count < max && count > max - warningLimit)),
	});

	return <div className={clx}>{children || count}</div>;
};

CharacterCount.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	count: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
	warningLimit: PropTypes.number,
};

export default CharacterCount;
