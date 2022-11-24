import { Icon } from '@acpaas-ui/react-components';
import classnames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import { HoverTooltip } from '../HoverTooltip';

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
		tooltip: {
			start: 'Voorzie (indien mogelijk)',
			min: 'minstens',
			max: 'maximaal',
			characters: 'karakters',
		},
	},
}) => {
	const isInvalid = useMemo(() => (count < min || count > max), [count, min, max]);

	const clx = useMemo(() => cx(className, 'c-character-count', {
		'c-character-count--warning': isInvalid,
	}), [isInvalid, className]);

	if (children) {
		return <div className={clx}>{children}</div>;
	}

	if ((!min && !max) || !count) {
		return <></>;
	}

	return (
		<HoverTooltip value={`${labels.tooltip.start} ${min ? `${labels.tooltip.min} ${min}` : ''}${max ? min ? ` en ${labels.tooltip.max} ${max}` : `${labels.tooltip.max} ${max}` : ''} ${labels.tooltip.characters}.`}>
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
		</HoverTooltip>
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
