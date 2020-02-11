const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');

function images() {
	return gulp.src('./src/img/*.*')
		.pipe(gulp.dest('./dist/img'))
}

function scripts() {
	return gulp.src('./src/scripts/*.+(js|php)')
		.pipe(gulp.dest('./dist/scripts'))
}

function html() {
	return gulp.src('./src/*.html')
		.pipe(gulp.dest('./dist'))
}

function css() {
	return gulp.src('./src/styles/*.css')
		.pipe(gulp.dest('./dist/styles'))
}

function cssTask() {
	return gulp.src('./src/styles/*.css')
		.pipe(autoprefixer())
}

function watchTask() {
	gulp.watch('./src/styles/*.css', cssTask);
}

exports.images = images;
exports.scripts = scripts;
exports.html = html;
exports.css = css;
exports.cssTask = cssTask;
exports.watchTask = watchTask;

exports.build = gulp.parallel(images, scripts, html, css);
exports.default = gulp.parallel(cssTask, watchTask);