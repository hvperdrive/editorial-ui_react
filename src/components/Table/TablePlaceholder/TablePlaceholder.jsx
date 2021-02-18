import PropTypes from 'prop-types';
import React from 'react';

import '../Table.scss';

const TablePlaceholder = ({
	hasCols,
	hasData,
	noColumnsMessage,
	noDataMessage,
}) => {
	const showNoCols = !hasCols;
	const showNoData = !hasData;

	return (
		<div className="a-table a-table--has-placeholder">
			{showNoData && <div className="a-table--has-placeholder__item">{noDataMessage}</div>}
			{showNoCols && <div className="a-table--has-placeholder__item">{noColumnsMessage}</div>}
		</div>
	);
};

TablePlaceholder.propTypes = {
	hasCols: PropTypes.bool.isRequired,
	hasData: PropTypes.bool.isRequired,
	noColumnsMessage: PropTypes.string,
	noDataMessage: PropTypes.string,
};

export default TablePlaceholder;
