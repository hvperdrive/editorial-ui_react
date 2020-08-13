import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './NavList.scss';

const NavList = ({ className, linkComponent: LinkComponent = 'a', items }) => (
	<ul className={classnames(className, 'm-nav-list')}>
		{items.map(({ hasError, label, ...linkProps }, index) => (
			<li
				key={`nav-list-${index}`}
				className={classnames({ 'm-nav-list__item--error': hasError })}
			>
				<LinkComponent {...linkProps}>
					{label}
					{hasError && '*'}
				</LinkComponent>
			</li>
		))}
	</ul>
);

NavList.propTypes = {
	className: PropTypes.string,
	linkComponent: PropTypes.elementType,
	items: PropTypes.arrayOf(PropTypes.shape({
		hasError: PropTypes.boolean, label: PropTypes.string.isRequired,
	})).isRequired,
};

export default NavList;
