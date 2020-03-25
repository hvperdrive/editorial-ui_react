// eslint-disable-next-line max-len
import {
	Accordion, AccordionTab, AccordionTabContent, AccordionTabHeader, Button, TagList, TagListItem,
} from '@acpaas-ui/react-components';
import PropTypes from 'prop-types';
import React from 'react';

import { useSlot } from '../../hooks/useSlot';

import { FilterBody } from './Filter.slots';

const Filter = ({
	title,
	children,
	onConfirm,
	onClean,
	activeFilters = [],
	onFilterRemove,
}) => {
	const filterSlot = useSlot(FilterBody, children);

	return (
		<div>
			<div className="u-container">
				<Accordion>
					<AccordionTab>
						<AccordionTabHeader><h3 className="u-text-primary">{title}</h3></AccordionTabHeader>
						<AccordionTabContent className="m-filter-form">
							<div className="row between-xs">
								{filterSlot ? (
									<>{ filterSlot }</>
								) : (
									<p>Geen filters beschikbaar</p>
								)}
								<div className="u-margin-top end-xs">
									<Button type="primary" onClick={onClean} negative>Alles leegmaken</Button>
									<Button type="primary" iconRight="angle-right" onClick={onConfirm} outline>Toepassen</Button>
								</div>
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
};

Filter.propTypes = {
	title: PropTypes.string,
	onConfirm: PropTypes.func,
	onClean: PropTypes.func,
	activeFilters: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	})),
	onFilterRemove: PropTypes.func,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};

export default Filter;
