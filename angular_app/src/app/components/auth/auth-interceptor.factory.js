'use strict'

angular.module('auth')
  .factory('AuthInterceptor', function ($rootScope, $q, CookieService) {
    return {

      request: function (config) {
        // preset params object in case it is not set
        config.params = config.params || {}

        var currentUser = CookieService.getCurrentUser()

        if (currentUser && currentUser.authToken && angular.isString(config.url) && config.url.indexOf('.html') === -1) {
          angular.extend(config.params, {auth_token: currentUser.authToken})
        }
        return config
      },

      responseError: function (response) {
        if (response.status === 401) {
          $rootScope.$emit('unauthorized')
          // remove any stale tokens
          CookieService.remove()
        }
        return $q.reject(response)
      }
    }
  })
