'use strict'

angular.module('feature')
    .service('FeatureService', function ($q, config, $http, $filter) {
        var self = this
        var featureUrl = [config.api.url, config.api.feature].join('/')

        self.getProductAreas = function () {
           return [
               { id: 'Policies' },
               { id: 'Billing' },
               { id: 'Claims' },
               { id: 'Reports' }
           ]
        }

        self.actions = {
            edit: 'edit',
            delete: 'delete'
        }

        self.getList = function () {
            return $http.get(featureUrl)
                .then(function (response) {
                    return response.data
                })
        }

        self.save = function (record) {
            console.log(record)
            var featureRequest = angular.copy(record)
            if (featureRequest.targetDate) {
                featureRequest.targetDate = $filter('date')(featureRequest.targetDate, 'yyyy-MM-dd')
            }
            if (featureRequest.id) {
                var url = [featureUrl, featureRequest.id].join('/')
                return $http.put(url, featureRequest)
            }
            //create new
            return $http.post(featureUrl, featureRequest)

        }

        self.getBy = function (id) {
            var url = [featureUrl, id].join('/')
            return $http.get(url)
                .then(function (response) {
                    return response.data
                })
        }

        self.deleteBy = function (id) {
            var url = [featureUrl, id].join('/')
            console.log('Delete : ', url)
            return $http.delete(url)
                .then(function (response) {
                    return response.data
                })
        }

    })

