'use strict'

angular.module('app')
  .config(function ($httpProvider, $locationProvider, cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeBar = true
      cfpLoadingBarProvider.includeSpinner = true
      $httpProvider.interceptors.push('AuthInterceptor')
      $locationProvider.html5Mode({enabled: true, requireBase: false})
      $locationProvider.hashPrefix('!')
  })
