const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

function autoprefixerTask() {
	return gulp
		.src('./styles/style.css')
		.pipe(autoprefixer())
		.pipe(rename(function (path) {
			path.basename = "app";
		}))
		.pipe(gulp.dest('./styles/app'))
}

function watchTask() {
	gulp.watch('./styles/*.css', autoprefixerTask);
}

exports.autoprefixerTask = autoprefixerTask;
exports.watchTask = watchTask;
exports.default = gulp.parallel(autoprefixerTask, watchTask);