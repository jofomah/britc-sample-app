# BritCore Flask Sample App


[![Build Status][travis-image]][travis-url]

[travis-url]: https://travis-ci.org/jofomah/britc-sample-app
[travis-image]: https://travis-ci.org/jofomah/britc-sample-app.svg?branch=master

> A Flask and AngularJS web application


## Installation Guide

- Run `./install.sh` while in the root folder to set up Flask environment
- `MAIL_PASSWORD={mail-password} ADMIN_USER={admin-username} ADMIN_PASS={admin-pass} ADMIN_EMAIL=osdevseries@gmail.comflask/bin/python db_create.py` to create database. if you encounter any error, delete app.db in root folder and run again ** Note: it might lead to data loss.

- Install [Node.js][] (>=0.12 < 4, npm >=2 <3)
- Run `npm install -g gulp` to install gulp globally
- Run `npm install -g bower` to install bower globally
- Run `npm install -g standard` to install standard globally (used for running standardjs  style checks)
- `cd angular_app` to run  
- `npm install` to install node packages which will also run `bower install`, if bower packages didn't install, run it by `bower i`
- To run unit test `gulp test`, once test comepleted, open `coverage/lcov/lcov-report/index.html` to see test coverage report.
- Run `gulp build` to build(inject dependencies, minify `js`, `css`, `html`) from  `src` folder and copy the source code to `app/static` folder
- Run `npm test` to run AngularJS test
- while in root folder run `flask/bin/nosetests` to run flask server side unit test

### Start Flask Application

- cd angular_app and run `grunt build` to generate minified version of the client side and place in `app/static` folder
- cd to root folder and run the following commands.
- MAIL_SENDER=<mail-sender-email> MAIL_PASSWORD=<email-sender-account-password> ADMIN_USER=<default-admin-username> ADMIN_PASS=<admin-account-password> ADMIN_EMAIL=<admin-email> flask/bin/python run.py
- open browser and navigate to `http://localhost:5000` to serve directly from server side or 
- `cd angular_app` and run `gulp serve` it will automatically open a chrome browser (this is only for development purpose)

## License

Released under the [ISC][license].
