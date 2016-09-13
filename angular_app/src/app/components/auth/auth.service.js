'use strict'

angular.module('auth')
  .service('AuthService', function ($q) {
    // create refs to auth service scope
    var self = this

    self.login = function (user) {
      return $q.reject({ status: 401, msg: 'wrong username and password'})
    }

    self.logout = function () {
      // TODO: implement
    }
  })
