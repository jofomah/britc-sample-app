'use strict'

angular.module('home')
  .config(function ($stateProvider) {
    $stateProvider.state('home', {
      parent: 'index',
      url: '/',
      templateUrl: 'app/home/home.tpl.html',
      data: {
        label: 'Home'
      }
    })
  })
