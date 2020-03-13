import React from 'react';

import Example from './Example';

export default {
	component: Example,
	title: 'Example',
};

export const noProps = () => <Example />;
export const withText = () => <Example text="This is custom text" />;
