'use strict';

var gulp = require('gulp'),
	// uglify = require('gulp-uglify'),
	// cssmin = require('gulp-minify-css'),
	path = require('path'),
	webpack = require('gulp-webpack'),
    concat = require('gulp-concat'),
    conmap = require('gulp-concat-sourcemap'),
    stylus = require('gulp-stylus'),
    jshint = require('gulp-jshint'),
    live   = require('gulp-livereload'),
    notify = require('gulp-notify'),
    flatten = require('gulp-flatten'),
    plumber = require('gulp-plumber'),
	phpunit = require('gulp-phpunit'),
	del = require('del'),

	wpCfg = {
		// devtool: '#inline-source-map',
		minimize: true,
		output: { filename: 'app.js' },
		resolve: { root: path.join(__dirname, '/src/modules') }
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
		.pipe(phpunit('c:/bin/phpunit.cmd', { notify: true }))
		.on('error', notify.onError('PHPUnit failed!'));
});

gulp.task('lib-css', function () {
	return gulp.src([ 'src/lib/*.css' ]).pipe(concat('lib.css')).pipe(gulp.dest('assets'));
});

gulp.task('lib-js', function () {
	return gulp.src([ 'src/lib/*.js', 'src/jswrap/*.js' ]).pipe(concat('lib.js')).pipe(gulp.dest('assets')).pipe(live());
});

gulp.task('js', function () {
	return gulp.src(['src/app.js']).pipe(webpack(wpCfg, null, wpErr)).pipe(gulp.dest('assets/')).pipe(live());
});

gulp.task('jshint', function () {
	return gulp.src([ 'src/modules/**/*.js', 'src/app.js' ])
		.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
		.pipe(jshint('src/.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('styl', function () {
	return gulp.src([ 'src/app.styl', 'src/modules/**/*.styl' ])
		.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
		.pipe(stylus({ paths: [ 'src' ]}))   //.pipe(cssmin({ keepSpecialComments: 0 }))
		.pipe(concat('app.css'))
		.pipe(gulp.dest('assets'))
		.pipe(live());
});

gulp.task('watch', function () {
	live.listen();
	gulp.watch('src/**/*.styl', [ 'styl' ]);
	gulp.watch(['**/*.php', '*.html'], [ 'php', 'phpunit' ]);
	gulp.watch(['src/*.js', 'src/modules/**/*.js'], [ 'js', 'jshint' ]);
	gulp.watch(['src/lib/*.js', 'src/jswrap/*.js'], [ 'lib-js' ]);
});

gulp.task('test', [ 'phpunit' ]);
gulp.task('default', [ 'clean', 'lib-js', 'lib-css', 'js', 'styl', 'phpunit', 'watch' ]);
