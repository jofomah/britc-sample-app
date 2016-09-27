'use strict'

angular.module('app')
  .config(function ($httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('AuthInterceptor')
      $locationProvider.html5Mode({ enabled: true, requireBase: false })
      $locationProvider.hashPrefix('!')
  })
