import { Icon } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import styles from './MultilanguageField.module.scss';

const cx = classNames.bind(styles);

const MultilanguageField = ({ asComponent, ...props }) => {
	const FormField = useMemo(() => () => React.createElement(asComponent, props), [asComponent, props]);

	return (
		<div className={cx('u-bg-light', 'o-multilanguage-field')}>
			<Icon name="globe" className={cx('o-multilanguage-field__icon')} />
			<FormField />
		</div>
	);
};

MultilanguageField.propTypes = {
	asComponent: PropTypes.node,
};

export default MultilanguageField;
