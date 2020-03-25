// eslint-disable-next-line max-len
import {
	Accordion, AccordionTab, AccordionTabContent, AccordionTabHeader, Button, TagList, TagListItem,
} from '@acpaas-ui/react-components';
// import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Filter = ({
	title,
	filters,
	onConfirm,
	onClean,
	activeFilters = [],
	onFilterRemove,
}) => (
	<div>
		<div className="u-container">
			<Accordion>
				<AccordionTab>
					<AccordionTabHeader><h3 className="u-text-primary">{title}</h3></AccordionTabHeader>
					<AccordionTabContent>
						{filters ? (
							<div>{ filters }</div>
						) : (
							<p>Geen filters beschikbaar</p>
						)}
						<div className="u-margin-top u-text-right">
							<Button type="primary" onClick={onClean} negative>Alles leegmaken</Button>
							<Button type="primary" iconRight="angle-right" onClick={onConfirm} outline>Toepassen</Button>
						</div>
					</AccordionTabContent>
				</AccordionTab>
			</Accordion>
			{ activeFilters.length > 0 ? (
				<div className="u-margin-top">
					<TagList>
						{activeFilters.map((filter) => (
							<TagListItem
								value={filter.value}
								key={filter.key}
								closable
								onClick={onFilterRemove}
							/>
						))}
					</TagList>
				</div>
			) : (
				''
			)}
		</div>
	</div>
);

Filter.propTypes = {
	title: PropTypes.string,
	onConfirm: PropTypes.func,
	onClean: PropTypes.func,
	activeFilters: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	})),
	onFilterRemove: PropTypes.func,
	filters: PropTypes.any,// eslint-disable-line
};

export default Filter;
