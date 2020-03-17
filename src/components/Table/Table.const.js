import PropTypes from 'prop-types';

export const orderType = PropTypes.oneOf(['asc', 'desc']);
export const orderByType = PropTypes.shape({
	key: PropTypes.string,
	order: orderType,
});

export const tablePropTypes = {
	rows: PropTypes.array.isRequired,
	columns: PropTypes.arrayOf(PropTypes.oneOf([
		PropTypes.string,
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: PropTypes.string,
			component: PropTypes.func,
			headerComponent: PropTypes.func,
			format: PropTypes.func,
			hidden: PropTypes.bool,
			disabled: PropTypes.bool,
			disableSorting: PropTypes.bool,
			classList: PropTypes.arrayOf(PropTypes.string),
		})
	])),
	loading: PropTypes.bool,
	responsive: PropTypes.bool,
	hasClickAction: PropTypes.bool,
	activeSorting: orderByType,
	noDataMesssage: PropTypes.string,
	loadDataMessage: PropTypes.string,
	noColumnsMessage: PropTypes.string,
	orderBy: PropTypes.func,
	rowClicked: PropTypes.func,
	striped: PropTypes.bool,
	type: PropTypes.oneOf(['primary', 'secondary']),
}

export const DEFAULT_MESSAGE = {
	loading: 'Loading data...',
	noColumns: 'No columns available.',
	noData: 'No data available.',
};
