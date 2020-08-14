export const MOCK_ITEMS = [
	{ href: '#link-1', title: 'Link 1', label: 'Link 1' },
	{
		href: '#link-2', title: 'Link 2', label: 'Link 2', description: 'Lorem ipsum',
	},
	{ href: '#link-3', title: 'Link 3', label: 'Link 3' },
];

export const MOCK_ITEMS_ERROR = [
	{
		href: '#link-1', title: 'Link 1', label: 'Link 1', hasError: false,
	},
	{
		href: '#link-2', title: 'Link 2', label: 'Link 2', hasError: true, description: 'Lorem ipsum',
	},
	{
		href: '#link-3', title: 'Link 3', label: 'Link 3', hasError: false,
	},
];
