'use strict'

angular.module('auth')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        parent: 'index',
        url: '/login',
        controller: 'LoginController',
        controllerAs: 'loginCtrl',
        templateUrl: 'app/components/auth/login.html',
        resolve: {
          // inject here because it makes testing easier
          isLoggedIn: function (CookieService) {
            return CookieService.isLoggedIn()
          }
        }
      })
      .state('logout', {
        parent: 'index',
        url: '/logout',
        controller: 'LogoutController',
        resolve: {
          logOut: function (AuthService, CookieService, $state) {
            return AuthService.logout()
              .then(function (response) {
                // Remove client side's stale sessionId
                CookieService.remove()
                return response
              })
              .then(function () {
                return $state.go('login')
              })
          }
        }
      })
  })
