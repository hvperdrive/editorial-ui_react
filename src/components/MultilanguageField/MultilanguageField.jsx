import { Icon } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './MultilanguageField.module.scss';

const cx = classNames.bind(styles);

const MultilanguageField = ({ component, ...props }) => {
	const formField = () => React.createElement(component, props);
	return (
		<div className={cx('u-bg-light', 'o-multilanguage-field')}>
			<Icon name="globe" className={cx('o-multilanguage-field__icon')} />
			{formField}
		</div>
	);
};

MultilanguageField.propTypes = {
	component: PropTypes.node,
};

export default MultilanguageField;
