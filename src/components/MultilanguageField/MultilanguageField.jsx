import { Icon, TextField } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import styles from './MultilanguageField.module.scss';

const cx = classNames.bind(styles);

const FormField = ({ asComponent, ...props }) => React.createElement(asComponent, props);

const MultilanguageField = ({ asComponent, ...props }) => (
	<div className={cx('u-bg-light', 'o-multilanguage-field')}>
		<Icon name="globe" className={cx('o-multilanguage-field__icon')} />
		<FormField asComponent={asComponent} {...props} />
	</div>
);

FormField.propTypes = {
	asComponent: PropTypes.element,
};

MultilanguageField.propTypes = {
	asComponent: PropTypes.element,
};

export default MultilanguageField;
