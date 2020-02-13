const gulp = require('gulp');
const plumber = require('gulp-plumber');
const connect = require('gulp-connect');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const terser = require('gulp-terser');

// IMG TASK (COPY IMAGES TO DIST)

function imgTask() {
	return gulp
		.src('./src/img/*.*')
		.pipe(plumber())
		.pipe(gulp.dest('./dist/img'))
}

// JS TASK (MINIFY JS, CONCAT JS, SOURCEMAP JS, COPY JS/PHP TO DIST)

function jsTask() {
	return gulp
		.src('./src/scripts/*.js')
		.pipe(plumber())
		// .pipe(concat('main.js'))
		// .pipe(terser())
		// .pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./dist/scripts'))
}

// PHP TASK (COPY TO DIST)

function phpTask() {
	return gulp
		.src('./src/scripts/*.php')
		.pipe(plumber())
		.pipe(gulp.dest('./dist/scripts'))
}

// SEO TASK (COPY FILES TO DIST)

function seoTask() {
	return gulp
		.src([
			'./src/robots.txt',
			'./src/sitemap.xml'
		])
		.pipe(plumber())
		.pipe(gulp.dest('./dist'))
}

// HTML TASK (COPY HTML FILE TO DIST)

function htmlTask() {
	return gulp
		.src('./src/*.html')
		.pipe(plumber())
		.pipe(gulp.dest('./dist'))
}

// CSS TASK (SOURCEMAP, AUTOPREFIXER, MINIFY, RENAME, CONCAT, COPY TO DIST)

function cssTask() {
	return gulp
		.src([
			'./src/styles/fonts.css',
			'./src/styles/reset.css',
			'./src/styles/style.css'
		])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(rename({suffix: '.min'}))
		.pipe(concat('main.min.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/styles'))
}

// SERVER TASK

function serverTask() {
	connect.server({
		root: 'dist',
		livereload: true
	});
}

// RELOAD TASKS

function reloadHtml() {
	return gulp
		.src('./dist/*.html')
		.pipe(connect.reload())
}

function reloadCss() {
	return gulp
		.src('./dist/styles/*.css')
		.pipe(connect.reload())
}

function reloadJs() {
	return gulp
		.src('./dist/scripts/*.js')
		.pipe(connect.reload())
}

function reloadPhp() {
	return gulp
		.src('./dist/scripts/*.php')
		.pipe(connect.reload())
}

function reloadImages() {
	return gulp
		.src('./dist/img/*.*')
		.pipe(connect.reload())
}

function watchTask() {
	gulp.watch('./src/*.html', gulp.series(htmlTask,reloadHtml));
	gulp.watch('./src/styles/*.css', gulp.series(cssTask,reloadCss));
	gulp.watch('./src/scripts/*.js', gulp.series(jsTask,reloadJs));
	gulp.watch('./src/scripts/*.php', gulp.series(phpTask,reloadPhp));
	gulp.watch('./src/img/*.*', gulp.series(imgTask,reloadImages));
}

exports.build = gulp.parallel(imgTask, jsTask, phpTask, seoTask, htmlTask, cssTask);
exports.dev = gulp.series(exports.build, gulp.parallel(serverTask, watchTask));

exports.default = exports.dev;