'use strict'

angular.module('feature')
    .service('FeatureService', function ($q, config, $http, $filter, $rootScope) {
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
            return $http.delete(url)
                .then(function (response) {
                    return response.data
                })
        }

        self.sortFeatureBy = function (features) {
            return features.sort(function (featA, featB) {
                // sort by client name, then priority in ASC order, i.e if 0, same client name, sort by priority
                return featA.client.name.localeCompare(featA.client.name) || (featA.priority - featB.priority)
            })
        }

        self.filterBy = function (list, clientId) {
            return list.filter(function (item) {
                return item.client.id === clientId
            })
        }

        self.rearrange = function (srcIndex, destIndex, movedFeature, oldList, updatedList) {
            var selectedFeatureClientId =  (movedFeature.client && movedFeature.client.id) || 'unknown'
            var sameClientOldList = self.filterBy(oldList, selectedFeatureClientId)
            var sameClientUpdatedList = self.filterBy(updatedList, selectedFeatureClientId)

            // TODO: implement and prepare data to be sent to the server
            $rootScope.$applyAsync(function () {
                // TODO: trigger loading overlay to prevent concurrent sorting, hide overlay after current sort has been saved in the server successfully
            })
        }

    })

