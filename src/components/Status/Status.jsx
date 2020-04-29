import PropTypes from 'prop-types';
import React from 'react';

import { typeMap } from './Status.helpers';

const ActionBar = ({
	label,
	type,
}) => <span className={`u-text-${typeMap[type]}`}>{label}</span>;

ActionBar.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['ACTIVE', 'INACTIVE', 'ARCHIVED']).isRequired,
};

export default ActionBar;
