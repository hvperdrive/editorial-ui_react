import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default {
	input: 'src/index.js',
	output: [
		{ file: pkg.main, format: 'cjs' },
		{ file: pkg.module, format: 'es' },
	],
	plugins: [
		resolve({
			extensions: ['.js', '.jsx'],
		}),
		babel(),
		terser(),
	],
	external: [
		'@acpaas-ui/react-components',
		'classnames',
		'prop-types',
		'react',
	],
};
