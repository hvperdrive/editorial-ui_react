import { Icon } from '@acpaas-ui/react-components';
import classnames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import styles from './CharacterCount.module.scss';

const cx = classnames.bind(styles);

const CharacterCount = ({
	className,
	children,
	count = 0,
	min,
	max,
	labels = {
		until: 'tot',
		min: 'min',
		max: 'max',
	},
}) => {
	const isInvalid = useMemo(() => (count < min || count > max), [count, min, max]);

	const clx = useMemo(() => cx(className, 'c-character-count', {
		'c-character-count--warning': isInvalid,
	}), [isInvalid, className]);

	if (children) {
		return <div className={clx}>{children}</div>;
	}

	if (!min && !max) {
		return <></>;
	}

	return (
		<div className={clx}>
			<Icon
				name={isInvalid ? 'exclamation-triangle' : 'check-circle'}
				className={cx('a-character-count-icon', {
					'a-character-count-icon--warning': isInvalid,
				})}
			/>
			<p className={cx('a-character-count-counter')}>{count}</p>

			{min && max ? (
				<p>
					(
					{min}
					{' '}
					{labels.until}
					{' '}
					{max}
					)
				</p>
			) : min ? (
				<p>
					(
					{labels.min}
					{' '}
					{min}
					)
				</p>
			) : (
				<p>
					(
					{labels.max}
					{' '}
					{max}
					)
				</p>
			)}
		</div>
	);
};

CharacterCount.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	count: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
	labels: {
		until: PropTypes.string,
		min: PropTypes.string,
		max: PropTypes.string,
	},
};

export default CharacterCount;
