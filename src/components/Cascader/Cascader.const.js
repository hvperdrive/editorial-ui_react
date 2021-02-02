import { KEY_CODE } from '../../const';

export const BUILT_IN_PLACEMENTS = {
	bottomLeft: {
		points: ['tl', 'bl'],
		offset: [0, 0],
		overflow: {
			adjustX: 1,
			adjustY: 1,
		},
	},
	topLeft: {
		points: ['bl', 'tl'],
		offset: [0, -4],
		overflow: {
			adjustX: 1,
			adjustY: 1,
		},
	},
	bottomRight: {
		points: ['tr', 'br'],
		offset: [0, 4],
		overflow: {
			adjustX: 1,
			adjustY: 1,
		},
	},
	topRight: {
		points: ['br', 'tr'],
		offset: [0, -4],
		overflow: {
			adjustX: 1,
			adjustY: 1,
		},
	},
};

export const ALLOWED_KEYS = [
	KEY_CODE.DOWN,
	KEY_CODE.UP,
	KEY_CODE.ENTER,
	KEY_CODE.SPACE,
	KEY_CODE.LEFT,
	KEY_CODE.RIGHT,
	KEY_CODE.BACKSPACE,
	KEY_CODE.ESC,
	KEY_CODE.TAB,
];

export const REOPEN_POPUP_KEYS = [
	KEY_CODE.DOWN,
	KEY_CODE.UP,
	KEY_CODE.ENTER,
	KEY_CODE.SPACE,
];
