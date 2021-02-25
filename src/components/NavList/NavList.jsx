import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './NavList.scss';

const NavList = ({ className, linkComponent: LinkComponent = 'a', items }) => (
	<ul className={classnames(className, 'm-nav-list')}>
		{items.map(({
			description,
			hasError,
			label,
			...linkProps
		}, index) => (
			<li
				key={`nav-list-${index}`}
				className={classnames('m-nav-list__item', { 'm-nav-list__item--error': hasError })}
			>
				<LinkComponent {...linkProps}>
					<span>{`${label}${hasError ? '*' : ''}`}</span>
					{description && <p className="m-nav-list__item-description u-text-light">{description}</p>}
				</LinkComponent>
			</li>
		))}
	</ul>
);

NavList.propTypes = {
	className: PropTypes.string,
	linkComponent: PropTypes.elementType,
	items: PropTypes.arrayOf(PropTypes.shape({
		hasError: PropTypes.bool,
		label: PropTypes.string.isRequired,
		description: PropTypes.string,
	})).isRequired,
};

export default NavList;
