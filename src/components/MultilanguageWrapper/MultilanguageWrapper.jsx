import { Icon } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './MultilanguageWrapper.module.scss';

const cx = classNames.bind(styles);

const MultilanguageWrapper = ({ className, children }) => {
	const classNameRoot = cx(className, 'u-bg-light', 'o-multilanguage-wrapper');

	return (
		<div className={classNameRoot}>
			<Icon name="globe" className={cx('o-multilanguage-wrapper__icon')} />
			{children}
		</div>
	);
};

MultilanguageWrapper.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

export default MultilanguageWrapper;
