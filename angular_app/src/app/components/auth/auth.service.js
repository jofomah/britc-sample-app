'use strict'

angular.module('auth')
  .service('AuthService', function ($q, $http, config, CookieService) {
      // create refs to auth service scope
      var self = this

      self.login = function (user) {
          var _user = angular.copy(user)
          var loginUrl = [config.api.url, config.api.login].join('/')
          return $http.post(loginUrl, _user)
              .then(function (response) {
                  CookieService.setCurrentUser(response.data)
                  return response.data
              })
      }

      self.logout = function () {
          return $http.get(config.api.logout)
              .then(CookieService.remove.bind(CookieService))
      }
  })
