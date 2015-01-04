'use strict';

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	stylus = require('gulp-stylus'),
	jshint = require('gulp-jshint'),
	live   = require('gulp-livereload'),
	notify = require('gulp-notify'),
	flatten = require('gulp-flatten'),
	plumber = require('gulp-plumber'),
	watch = require('gulp-watch'),
	del = require('del'),
	ngAnnotate = require('gulp-ng-annotate');

gulp.task('clean', function (cb) {
	del([ 'assets/**/*.{css,js,map,html}' ], cb);
});

gulp.task('php', function () {
	return gulp.src([ '**/*.php', './*.*' ]).pipe(live());
});

gulp.task('html', function () {
	return gulp.src([ 'src/**/*.html' ])
		.pipe(flatten())
		.pipe(gulp.dest('assets'))
		.pipe(live());
});

gulp.task('lib-js-maps', function () {
	return gulp.src([ 'src/lib/*.map' ]).pipe(gulp.dest('assets'));
});

gulp.task('lib-js', function () {
	return gulp.src([ 'src/lib/*.js' ])
		.pipe(concat('lib.js'))
		.pipe(gulp.dest('assets'));
});

gulp.task('js', function () {
	return gulp.src([ 'src/app.js', 'src/components/**/*.js' ])
		.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
		.pipe(jshint('src/.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(ngAnnotate())
		.pipe(concat('app.js'))   // .pipe(uglify())
		.pipe(gulp.dest('assets'))
		.pipe(live());
});

gulp.task('lib-css', function () {
	return gulp.src([ 'src/lib/*.css' ])
		.pipe(concat('lib.css'))
		.pipe(gulp.dest('assets'));
});

gulp.task('styl', function () {
	return gulp.src([ 'src/app.styl', 'src/components/**/*.styl', ])
		.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
		.pipe(stylus({ paths: [ 'src' ]}))   //.pipe(cssmin({ keepSpecialComments: 0 }))
		.pipe(concat('app.css'))
		.pipe(gulp.dest('assets'))
		.pipe(live());
});

gulp.task('watch', function () {
	live.listen();
	gulp.watch('src/**/*.js', [ 'js' ]);
	gulp.watch('src/**/*.styl', [ 'styl' ]);
	gulp.watch('src/**/*.html', [ 'html' ]);
	gulp.watch(['**/*.php', '*.*'], [ 'php' ]);
});

gulp.task('default', [ 'clean', 'lib-js', 'lib-css', 'lib-js-maps', 'html', 'js', 'styl', 'watch' ]);
