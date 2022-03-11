import { Icon } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './MultilanguageField.module.scss';

const cx = classNames.bind(styles);

const MultilanguageField = ({ as, ...props }) => {
	console.log({ as, ...props });

	const FormField = () => React.createElement(as, props);

	return (
		<div className={cx('u-bg-light', 'o-multilanguage-field')}>
			<Icon name="globe" className={cx('o-multilanguage-field__icon')} />
			<FormField />
		</div>
	);
};

MultilanguageField.propTypes = {
	as: PropTypes.node,
};

export default MultilanguageField;
