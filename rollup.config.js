import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import autoprefixer from 'autoprefixer';
import babel from 'rollup-plugin-babel';
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
		commonjs({
			include: ['node_modules/react-is/**'],
		}),
		resolve({
			extensions: ['.js', '.jsx', '.scss'],
		}),
		postcss({
			extensions: ['.css', '.scss'],
			plugins: [
				autoprefixer(),
			],
		}),
		babel(),
		terser(),
	],
	external: [
		'@acpaas-ui/react-components',
		'classnames',
		'classnames/bind',
		'prop-types',
		'react',
		'react-dom',
	],
};
