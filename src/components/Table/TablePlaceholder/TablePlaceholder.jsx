import { Spinner } from '@acpaas-ui/react-components';
import PropTypes from 'prop-types';
import React from 'react';

const TablePlaceholder = ({
	colSpan,
	hasCols,
	hasData,
	loading,
	loadDataMessage,
	noColumnsMessage,
	noDataMesssage,
}) => (
	<tr>
		<td colSpan={colSpan}>
			{loading && (
				<div className="table-loading">
					{loadDataMessage}
					<Spinner />
				</div>
			)}
			{!hasCols && <div>{noColumnsMessage}</div>}
			{!hasData && <div>{noDataMesssage}</div>}
		</td>
	</tr>
);

TablePlaceholder.propTypes = {
	colSpan: PropTypes.number,
	hasCols: PropTypes.bool.isRequired,
	hasData: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	loadDataMessage: PropTypes.string,
	noColumnsMessage: PropTypes.string,
	noDataMesssage: PropTypes.string,
};

export default TablePlaceholder;
