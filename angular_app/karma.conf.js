'use strict'

var path = require('path')
var conf = require('./gulp/conf')

var extend = require('extend')
var wiredep = require('wiredep')

function listFiles () {
  var wiredepOptions = extend({}, conf.wiredep, {
    dependencies: true,
    devDependencies: true
  })
  // join bower components files with src code files, before injecting using wiredep
  return wiredep(wiredepOptions).js
    .concat([
      path.join(conf.paths.src, '/app/**/*.module.js'),
      path.join(conf.paths.src, '/app/**/*.js'),
      path.join(conf.paths.src, '/**/*.spec.js'),
      path.join(conf.paths.src, '/**/*.mock.js'),
      path.join(conf.paths.src, '/**/*.html')
    ])
}

module.exports = function (config) {
  var configuration = {
    files: listFiles(),

    singleRun: true,

    autoWatch: false,
    // specify test framework as Jasmine and angular file sort is used to make sure angular files are injected in correct order.
    frameworks: ['jasmine', 'angular-filesort'],

    angularFilesort: {
      whitelist: [path.join(conf.paths.src, '/**/!(*.html|*.spec|*.mock).js')]
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      moduleName: 'app'
    },

    browsers: ['PhantomJS'],

    reporters: [
      'progress',
      'coverage'
    ],
    // Pre-process and prepare files that will be used for running test using wild cards to create a white list
    preprocessors: {
      'src/**/*.html': ['ng-html2js'],
      'src/app/**/!(*.spec|*.mock).js': ['coverage']
    },
    // Specify which folder test coverage report folder and type.
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        {
          type: 'lcov',
          subdir: 'lcov'
        }
      ]
    }
  }

  config.set(configuration)
}
