import React from 'react';

import { DefaultComponentProps } from '../../types';

export interface ContextHeaderBadge {
	type: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
	name: string;
}

export interface ContextHeaderTab {
	name: string;
	target: string;
	active?: boolean;
	disabled?: boolean;
}

export interface ContextHeaderProps extends DefaultComponentProps {
	children?: React.ReactNode;
	title: string;
	badges?: ContextHeaderBadge[];
	tabs?: ContextHeaderTab[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	linkProps?: (props: any) => any;
}

declare const ContextHeader: React.FC<ContextHeaderProps>;

export default ContextHeader;
