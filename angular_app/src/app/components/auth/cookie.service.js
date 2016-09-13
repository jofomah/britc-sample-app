'use strict'

angular.module('auth')
  .service('CookieService', function ($cookies) {
    // create refs to auth service scope
    var self = this

    var LOGGED_IN_USER = 'logged-in-user'

    self.setCurrentUser = function (user) {
      return $cookies.putObject(LOGGED_IN_USER, user)
    }

    self.getCurrentUser = function () {
      return $cookies.getObject(LOGGED_IN_USER)
    }

    self.remove = function () {
      return $cookies.remove(LOGGED_IN_USER)
    }

    self.isLoggedIn = function () {
      var currentUserSession = self.getCurrentUser()
      // returning the result of this condition check will return (currentUserSession.sessionId) but we want True or False not
      // Truthy or Falsy value
      if ((currentUserSession && currentUserSession.username && currentUserSession.sessionId)) {
        return true
      }
      return false
    }
  })
