'use strict'

angular.module('clients')
    .service('ClientService', function (config, $http) {
        var self = this
        var clientUrl = [config.api.url, config.api.client].join('/')

        self.getList = function () {
            return $http.get(clientUrl)
                .then (function (response) {
                    return (response && response.data) || response
                })
        }

    })

