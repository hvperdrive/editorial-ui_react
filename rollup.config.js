import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default {
	input: 'src/index.js',
	output: [
		{ file: pkg.main, format: 'cjs' },
		{ file: pkg.module, format: 'es' },
	],
	plugins: [
		postcss({
			modules: true,
		}),
		resolve({
			extensions: ['.js', '.jsx', '.scss'],
		}),
		babel(),
		terser(),
		copy({
			targets: [{ src: 'src/**/*.d.ts', dest: 'dist/types' }],
			flatten: false,
		}),
	],
	external: [
		'@acpaas-ui/react-components',
		'classnames',
		'prop-types',
		'react',
	],
};
