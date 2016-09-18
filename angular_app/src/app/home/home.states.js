'use strict'

angular.module('home')
    .config(function ($stateProvider) {
        $stateProvider.state('home', {
            parent: 'index',
            url: '/',
            templateUrl: 'app/home/home.tpl.html',
            controller: "HomeController as homeCtrl",
            resolve: {
                featureRequests: function (FeatureService) {
                    return FeatureService.getList()
                }
            },
            data: {
                label: 'Home'
            }
        })
    })
