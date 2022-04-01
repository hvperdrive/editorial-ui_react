/* eslint-disable react/forbid-prop-types */
import { Icon } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './MultilanguageField.module.scss';

const cx = classNames.bind(styles);

const FormField = ({ asComponent, fieldClassName, ...props }) => React.createElement(
	asComponent, props,
);

const MultilanguageField = ({ asComponent, fieldClassName, ...props }) => (
	<div className={cx('u-bg-light', 'o-multilanguage-field')}>
		<Icon name="globe" className={cx('o-multilanguage-field__icon')} />
		<FormField className={cx(fieldClassName)} asComponent={asComponent} {...props} />
	</div>
);

FormField.propTypes = {
	asComponent: PropTypes.any,
	fieldClassName: PropTypes.string,
};

MultilanguageField.propTypes = {
	asComponent: PropTypes.any,
	fieldClassName: PropTypes.string,
};

export default MultilanguageField;
