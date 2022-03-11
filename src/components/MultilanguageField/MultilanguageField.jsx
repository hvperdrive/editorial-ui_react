/* eslint-disable react/forbid-prop-types */
import { Icon } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './MultilanguageField.module.scss';

const cx = classNames.bind(styles);

const FormField = ({ asComponent, ...props }) => React.createElement(asComponent, { ref: props.innerRef, ...props });

const MultilanguageField = ({ asComponent, ...props }) => (
	<div className={cx('u-bg-light', 'o-multilanguage-field')}>
		<Icon name="globe" className={cx('o-multilanguage-field__icon')} />
		<FormField asComponent={asComponent} {...props} />
	</div>
);

FormField.propTypes = {
	asComponent: PropTypes.any,
	innerRef: PropTypes.any,
};

MultilanguageField.propTypes = {
	asComponent: PropTypes.any,
};

export default MultilanguageField;
