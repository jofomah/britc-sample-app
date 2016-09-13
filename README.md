# BritCore Flask Sample App


[![Build Status][travis-image]][travis-url]

[travis-url]: https://travis-ci.org/jofomah/britc-sample-app
[travis-image]: https://travis-ci.org/jofomah/britc-sample-app.svg?branch=master

> A Flask and AngularJS web application


## Installation Guide

- Run `./install.sh` while in the root folder to set up Flask environment

- Install [Node.js][] (>=0.12 < 4, npm >=2 <3)
- Run `npm install -g gulp` to install gulp globally
- Run `npm install -g bower` to install bower globally
- Run `npm install -g standard` to install standard globally (used for running standardjs  style checks)
- `npm install` to install node packages which will also run `bower install`, if bower packages didn't install, run it by `bower i`
- To run unit test `gulp test`, once test comepleted, open `coverage/lcov/lcov-report/index.html` to see test coverage report.
- Run `gulp build` to build(inject dependencies, minify `js`, `css`, `html`) from  `src` folder and copy the source code to `app/static` folder
- To serve, run `gulp serve` once it is completed, open `http://localhost:3000` on your browser.
- Run `npm test` to run angularjs test

### Start Flask Application

- flask/bin/python run.py
- open browser and navigate to `http://localhost:3000`

## License

Released under the [ISC][license].
