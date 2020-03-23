// eslint-disable-next-line max-len
import {
	Accordion, AccordionTab, AccordionTabContent, AccordionTabHeader, Button, TextField,
} from '@acpaas-ui/react-components';
// import classnames from 'classnames';
// import PropTypes from 'prop-types';
import React from 'react';

const Filter = () => {
	return (
		<div>
			<div className="u-container">
				<Accordion>
					<AccordionTab>
						<AccordionTabHeader>Filter</AccordionTabHeader>
						<AccordionTabContent>
							<TextField
								label="Zoeken"
								id="textfield-id-3"
								name="textfield-name"
								className="textfield-class"
								placeholder="Zoeken op naam, beschrijving..."
								onChange={(value) => console.log('Filteren op:', value)}
								iconright="search"
							/>
							<Button type="primary" negative>Alles leegmaken</Button>
							<Button type="primary" iconright="chevron-right" outline>Toepassen</Button>
						</AccordionTabContent>
					</AccordionTab>
				</Accordion>
			</div>
		</div>
	);
};

Filter.propTypes = {
};

export default Filter;
