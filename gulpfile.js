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
		.pipe(autoprefixer())
		.pipe(gulp.dest('./dist/styles'))
}

function watchTask() {
	gulp.watch('./src/styles/*.css', css);
}

exports.images = images;
exports.scripts = scripts;
exports.html = html;
exports.css = css;
exports.watchTask = watchTask;
exports.default = gulp.parallel(images, scripts, html, gulp.parallel(css, watchTask));