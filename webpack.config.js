const webpack = require('atool-build/lib/webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var fs = require('fs-extra');
var path = require('path');
var glob = require('glob');

module.exports = function (webpackConfig, env) {
	//清空输出目录
	fs.emptyDirSync('./dist');

	webpackConfig.babel.plugins.push('transform-runtime');

	webpackConfig.babel.plugins.push(['import', {
		libraryName: 'antd',
		libraryDirectory: 'lib',
		style: true
	}]);

	// Support hmr
	if (env === 'development') {
		webpackConfig.devtool = '#eval';
		webpackConfig.babel.plugins.push(['dva-hmr', {
			entries: [
				'./src/index.js',
			],
		}]);
	} else {
		webpackConfig.babel.plugins.push('dev-expression');
	}
	//入口文件
	webpackConfig.entry = getEntry('src/**/index.jsx');

	webpackConfig.plugins.some(function (plugin, i) {
		if (plugin instanceof webpack.optimize.CommonsChunkPlugin) {
			webpackConfig.plugins.splice(i, 1, new webpack.optimize.CommonsChunkPlugin({
				name: 'upm/common',
				filename: 'upm/common.js',
				minChunks: 4 // 提取使用5次以上的模块，打包到common里
			}));
			return true;
		}
	});

	/**解决HtmlWebpackPlugin与atool-build内置处理html的loader冲突**/
	webpackConfig.module.loaders.forEach(function (loader, i) {
		// atool-build 0.9版本需要采用这种方式
		if (loader.test.toString() === '/\\.html?$/') {
			loader.loader = 'html';
		}
	});


	var pages = Object.keys(getEntry('src/**/*.html'));
	pages.forEach(function (pathname) {
		var conf = {
			filename: pathname + '.html', //生成的html存放路径，相对于path
			template: 'src/' + pathname + '.html', //html模板路径
			inject: 'body',	//js插入的位置，true/'head'/'body'/false
			hash: true,
			// favicon: 'src/imgs/favicon.ico',
		};

		if (pathname in webpackConfig.entry) {
			conf.chunks = ['upm/common', pathname];
		} else if ('login' == pathname) {
			conf.chunks = ['upm/common', 'upm/login/index'];
		} else if ('main' == pathname) {
			conf.chunks = ['upm/common', 'upm/main/index'];
		}

		webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
	});

	webpackConfig.plugins.push(
		new CopyWebpackPlugin([
			{context: './src', from: '**/*.png', to: __dirname + '/dist'},
			{context: './src', from: '**/*.jpg', to: __dirname + '/dist'}
		])
	);

	return webpackConfig;
};

function getEntry(globPath) {
	var files = glob.sync(globPath);
	var entries = {}, entry, dirname, basename, pathname, extname;
	for (var i = 0; i < files.length; i++) {
		entry = files[i];
		dirname = path.dirname(entry);
		extname = path.extname(entry);
		basename = path.basename(entry, extname);
		pathname = path.join(dirname, basename);
		pathname = pathname.substr(4);
		pathname = pathname.replace(/\\/g, '/');
		entries[pathname] = ['./' + entry];
	}
	return entries;
}
