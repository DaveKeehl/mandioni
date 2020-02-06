const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');

function autoprefixerTask() {
	return gulp
		.src('./styles/style.css')
		.pipe(autoprefixer())
		.pipe(gulp.dest('./app'))
}

function watchTask() {
	gulp.watch('./styles/*.css', autoprefixerTask);
}

exports.autoprefixerTask = autoprefixerTask;
exports.watchTask = watchTask;
exports.default = gulp.parallel(autoprefixerTask, watchTask);