'use strict'

angular.module('feature')
    .service('FeatureService', function ($q, config, $http, $filter, Utility) {
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
                .then(Utility.getResponse)
        }

        self.save = function (record) {
            var featureRequest = angular.copy(record)
            if (featureRequest.targetDate) {
                featureRequest.targetDate = $filter('date')(featureRequest.targetDate, 'yyyy-MM-dd')
            }
            if (featureRequest.id) {
                var url = [featureUrl, featureRequest.id].join('/')
                return $http.put(url, featureRequest)
                    .then(Utility.getResponse)
            }
            //create new
            return $http.post(featureUrl, featureRequest)
                .then(Utility.getResponse)

        }

        self.getBy = function (id) {
            var url = [featureUrl, id].join('/')
            return $http.get(url)
                .then(Utility.getResponse)
        }

        self.deleteBy = function (id) {
            var url = [featureUrl, id].join('/')
            return $http.delete(url)
                .then(Utility.getResponse)
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

        self.rearrange = function (destIndex, itemList) {
            var movedItem = itemList[destIndex]
            var sameClientFeatures = self.filterBy(itemList, movedItem.client.id)
            var movedItemIndex = sameClientFeatures.map(function(feature) { return feature.id }).indexOf(movedItem.id)
            var rightSideNeighbour = sameClientFeatures[movedItemIndex  + 1]
            var leftSideNeighbour = sameClientFeatures[movedItemIndex - 1]
            var isMoreThanOneItems = (sameClientFeatures.length > 1)
            var lastItemIndex = sameClientFeatures.length - 1
            if (movedItemIndex === 0 && isMoreThanOneItems && (movedItem.priority > rightSideNeighbour.priority)) {
                movedItem.priority = (rightSideNeighbour.priority / 2)
            } else if (movedItemIndex === lastItemIndex && isMoreThanOneItems && movedItem.priority < leftSideNeighbour.priority) {
                movedItem.priority = (leftSideNeighbour.priority * 1.5)
            } else if (rightSideNeighbour && leftSideNeighbour) {
                movedItem.priority = (rightSideNeighbour.priority + leftSideNeighbour.priority) / 2
            }
            return movedItem
        }

        self.getItemFrom = function (list, value) {
            return list.filter(function (item) {
                return value === item.id
            })[0]
        }
    })

