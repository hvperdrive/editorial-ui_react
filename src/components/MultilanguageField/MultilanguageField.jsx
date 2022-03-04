import { Icon } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import { pathOr } from 'ramda';
import React from 'react';

import styles from './MultilanguageField.module.scss';

const cx = classNames.bind(styles);

const MultilanguageField = ({
	activeLanguage, languages, setFieldValue, ...props
}) => {
	const activeLang = activeLanguage.toLowerCase();

	const getFieldValue = () => {
		// TODO: remove value if languages does not contain key of value

		// if multilanguage, get value for active language
		if (pathOr(false, ['multilanguage'], props.value)) {
			const val = pathOr('', [activeLang], props.value);

			return val;
		}

		// else, create multilanguage object and set empty value for active language
		setFieldValue(props.name, {
			multilanguage: true,
			[activeLang]: props.value || '',
		});

		return props.value || '';
	};
	return (
		<div className={cx('u-bg-light', 'o-multilanguage-field')}>
			<Icon name="globe" className={cx('o-multilanguage-field__icon')} />
			<Field
				{...props}
				name={`${props.name}.${activeLang}`}
				value={getFieldValue()}
			/>
		</div>
	);
};

MultilanguageField.propTypes = {
	activeLanguage: PropTypes.string.isRequired,
	languages: PropTypes.arrayOf(PropTypes.string).isRequired,
	name: PropTypes.string.isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	value: PropTypes.any,
	setFieldValue: PropTypes.func.isRequired,
};

export default MultilanguageField;
