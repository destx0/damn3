import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';
import path from 'path';
import { dependencies as externals } from '../../release/app/package.json';
import webpackPaths from './webpack.paths';

const configuration: webpack.Configuration = {
	externals: [...Object.keys(externals || {})],

	stats: 'errors-only',

	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
						compilerOptions: {
							module: 'esnext',
						},
					},
				},
			},
		],
	},

	output: {
		path: webpackPaths.srcPath,
		library: {
			type: 'commonjs2',
		},
	},

	resolve: {
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
		modules: [webpackPaths.srcPath, 'node_modules'],
		alias: {
			'@': path.resolve(webpackPaths.srcPath), // Ensure this alias is correct
		},
		plugins: [
			new TsconfigPathsPlugin({
				configFile: path.resolve(__dirname, '../../tsconfig.json'), // Adjust the path according to your project structure
			}),
		],
	},

	plugins: [
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'production', // This is the default value for production builds
		}),
	],
};

export default configuration;
