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
	noDataMessage,
}) => {
	const showNoCols = !loading && !hasCols;
	const showNoData = !loading && !hasData;

	return (
		<tr>
			<td colSpan={colSpan}>
				{loading && (
					<div className="table-loading">
						{loadDataMessage}
						<Spinner style={{ display: 'inline' }} />
					</div>
				)}
				{showNoCols && <div>{noColumnsMessage}</div>}
				{showNoData && <div>{noDataMessage}</div>}
			</td>
		</tr>
	);
};

TablePlaceholder.propTypes = {
	colSpan: PropTypes.number,
	hasCols: PropTypes.bool.isRequired,
	hasData: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	loadDataMessage: PropTypes.string,
	noColumnsMessage: PropTypes.string,
	noDataMessage: PropTypes.string,
};

export default TablePlaceholder;
