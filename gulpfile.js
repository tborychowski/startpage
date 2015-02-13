'use strict';

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-minify-css'),
	webpack = require('gulp-webpack'),
    concat = require('gulp-concat'),
    stylus = require('gulp-stylus'),
    jshint = require('gulp-jshint'),
    live   = require('gulp-livereload'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
	phpunit = require('gulp-phpunit'),
	del = require('del'),
	wpCfg = require('./gulpfile-webpack.conf.js'),
	wpErr = function (err, stats) {
		if (err) notify.onError('Error: ' + err);
		err = stats.compilation.errors;
		if (err.length) notify.onError('Error: ' + err[0].message);
	};


gulp.task('php', function () { return gulp.src(['**/*.php', './*.*']).pipe(live()); });
gulp.task('clean', function (cb) { del(['assets/**/*.{css,js,map,html}', 'redirect/**/*'], cb); });

gulp.task('hellojs', ['clean'], function () {
	var _s = './node_modules/hellojs/', _b = { base: _s }, _t = './redirect/';
	gulp.src(_s + 'redirect.html', _b).pipe(gulp.dest(_t));
	gulp.src(_s + 'assets/redirect.css', _b).pipe(gulp.dest(_t));
	gulp.src(_s + 'src/hello.js', _b).pipe(uglify()).pipe(gulp.dest(_t));
});

gulp.task('phpunit', function() {
	return gulp.src('./phpunit.xml')
		.pipe(phpunit('phpunit', { notify: true }))
		.on('error', notify.onError('PHPUnit failed!'));
});

gulp.task('js', function () {
	return gulp.src(['src/app.js'])
		.pipe(webpack(wpCfg, null, wpErr))
		.pipe(uglify())
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
	return gulp.src(['src/app.styl', 'src/modules/**/*.styl'])
		.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
		.pipe(stylus({ paths: ['src']}))
		.pipe(cssmin({ keepSpecialComments: 0 }))
		.pipe(concat('app.css'))
		.pipe(gulp.dest('assets'))
		.pipe(live());
});

gulp.task('watch', function () {
	live.listen();
	gulp.watch('src/**/*.styl', ['styl']);
	gulp.watch(['src/*.js', 'src/modules/**/*.js'], ['js', 'jshint']);
	gulp.watch(['**/*.php', '*.html', '!**/__*.*'], ['php', 'phpunit']);
});

gulp.task('test', ['phpunit']);
gulp.task('default', ['clean', 'hellojs', 'js', 'styl', 'watch']);
