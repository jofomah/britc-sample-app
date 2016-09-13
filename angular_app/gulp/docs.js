'use strict'

var path = require('path')
var gulp = require('gulp')
var conf = require('./conf')
var connect = require('gulp-connect')

gulp.task('ngdocs', [], function () {
  var gulpDocs = require('gulp-ngdocs')
  return gulp.src(path.join(conf.paths.src, '/app/**/*.js'))
    .pipe(gulpDocs.process({html5Mode: false}))
    .pipe(gulp.dest('./docs'))
})

gulp.task('serve_docs', ['ngdocs'], function () {
  connect.server({
    root: 'docs',
    livereload: true,
    fallback: 'docs/index.html',
    port: 8083
  })
})
