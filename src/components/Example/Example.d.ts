import React from 'react';

interface ExampleProps {
	onClick: () => void;
	text: string;
}

declare const Example: React.FC<ExampleProps>;

export default Example;
