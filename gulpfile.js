var gulp = require('gulp')
var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')
var fs = require('fs')

fs.readdirSync(__dirname + '/gulp').forEach(function(task) {
	require('./gulp/' + task)
})

gulp.task('js', function() {
	gulp.src(['ng/module.js', 'ng/**/*.js'])
	  .pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		.pipe(ngAnnotate())
		.pipe(uglify())
	  .pipe(sourcemaps.write())
		.pipe(gulp.dest('assets'))
})


gulp.task('jsdev', function() {
	gulp.src(['ng/module.js', 'ng/**/*.js'])
		.pipe(concat('app_dev.js'))
		.pipe(gulp.dest('assets'))
})


gulp.task('watch:js', ['js', 'jsdev'], function() {
	gulp.watch('ng/**/*.js', ['js'])
})

gulp.task('dev', ['watch:js', 'watch:css', 'dev:server'])