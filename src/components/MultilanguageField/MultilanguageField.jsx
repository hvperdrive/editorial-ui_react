import { Icon } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import { Field } from 'formik';
import React from 'react';

import styles from './MultilanguageField.module.scss';

const cx = classNames.bind(styles);

const MultilanguageField = (props) => (
	<div className={cx('u-bg-light', 'o-multilanguage-field')}>
		<Icon name="globe" className={cx('o-multilanguage-field__icon')} />
		<Field {...props} />
	</div>
);

export default MultilanguageField;
