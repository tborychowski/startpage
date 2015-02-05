'use strict';

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-minify-css'),
	path = require('path'),
	webpack = require('gulp-webpack'),
    concat = require('gulp-concat'),
    stylus = require('gulp-stylus'),
    jshint = require('gulp-jshint'),
    live   = require('gulp-livereload'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
	phpunit = require('gulp-phpunit'),
	del = require('del'),

	wpCfg = {
		// devtool: '#inline-source-map',
		debug: true,
		output: { filename: 'app.js' },
		resolve: {
			root: path.join(__dirname, '/src/modules'),
			extensions: ['', '.js', '.json']
		},
		module: {
			loaders: [
				{ test: /\.html$/, loader: 'mustache' },
				{ test: /\.js$/, loader: '6to5-loader', exclude: /node_modules/ }
			]
		}
	},
	wpErr = function (err, stats) {
		if (err) notify.onError('Error: ' + err);
		err = stats.compilation.errors;
		if (err.length) notify.onError('Error: ' + err[0].message);
	};


gulp.task('clean', function (cb) { del([ 'assets/**/*.{css,js,map,html}' ], cb); });
gulp.task('php', function () { return gulp.src([ '**/*.php', './*.*' ]).pipe(live()); });

gulp.task('phpunit', function() {
	return gulp.src('./phpunit.xml')
		.pipe(phpunit('phpunit', { notify: true }))
		.on('error', notify.onError('PHPUnit failed!'));
});

gulp.task('js', function () {
	return gulp.src(['src/app.js'])
		.pipe(webpack(wpCfg, null, wpErr))
		// .pipe(uglify())
		.pipe(gulp.dest('assets/'))
		.pipe(live());
});

gulp.task('jshint', function () {
	return gulp.src([
			'src/app.js',
			'src/modules/**/*.js',
			'!src/modules/sortable/*.js'
		])
		.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
		.pipe(jshint('src/.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('styl', function () {
	return gulp.src([ 'src/app.styl', 'src/modules/**/*.styl' ])
		.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
		.pipe(stylus({ paths: [ 'src' ]}))
		.pipe(cssmin({ keepSpecialComments: 0 }))
		.pipe(concat('app.css'))
		.pipe(gulp.dest('assets'))
		.pipe(live());
});

gulp.task('watch', function () {
	live.listen();
	gulp.watch('src/**/*.styl', [ 'styl' ]);
	gulp.watch(['src/*.js', 'src/modules/**/*.js'], [ 'js', 'jshint' ]);
	gulp.watch(['**/*.php', '*.html', '!**/__*.*'], [ 'php', 'phpunit' ]);
});

gulp.task('test', [ 'phpunit' ]);
gulp.task('default', [ 'clean', 'js', 'styl', 'watch' ]);
