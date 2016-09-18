'use strict'

angular.module('feature')
    .controller('CreateFeatureRequestController', function (FeatureService, $uibModalInstance, toastr, clients, feature, action) {
        var vm = this
        vm.isEdit = (feature && feature.id && FeatureService.actions.edit === action) || false
        vm.isDelete = (feature && feature.id && FeatureService.actions.delete === action) || false
        vm.clients = clients

        vm.close = function () {
            $uibModalInstance.dismiss('cancel')
        }

        vm.save = function () {
            FeatureService.save(vm.featureRequest)
                .then($uibModalInstance.close.bind($uibModalInstance))
                .catch(function () {
                    toastr.error('An error occurred while saving feature request', 'Save Error')
                })
        }

        vm.delete = function () {
            FeatureService.deleteBy(vm.featureRequest.id)
                .then($uibModalInstance.close.bind($uibModalInstance))
                .catch(function (err) {
                    if (err.status === 404) {
                        toastr.error('Feature request does not exists or has been deleted', 'Missing Record')
                        return
                    }
                    toastr.error('An error occurred while saving feature request', 'Delete Error')
                })
        }

        vm.featureRequest = feature || {}

        if (!vm.featureRequest.targetDate) {
            vm.featureRequest.targetDate = new Date()
        }
        vm.featureRequest.targetDate = new Date(vm.featureRequest.targetDate)

        vm.productArea = ''
        vm.format = 'dd-MMMM-yyyy'

        vm.popup = {
            opened: false
        }
        vm.productAreas = FeatureService.getProductAreas()

        vm.open = function () {
            vm.popup.opened = true;
        }
    })
