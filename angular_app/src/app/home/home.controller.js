angular.module('home')
  .controller('HomeController', function ($uibModal, $state, $stateParams, FeatureService, featureRequests) {
      var vm = this
      vm.keyword = ''
      vm.orderByField = ''
      vm.features = featureRequests

      vm.sortBy = function (field) {
          vm.orderByField = field
      }
      vm.actions = FeatureService.actions

      vm.open = function (featureId, action) {
          var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: 'app/components/feature-request/dialog/manage-feature-request.html',
              controller: 'CreateFeatureRequestController as createFeatureCtrl',
              size: 'lg',
              backdrop: 'static',
              keyboard: false,
              resolve: {
                  feature: function () {
                      // pick it from the list instead of hitting the server
                      return vm.features.filter(function (feature) {
                          return featureId === feature.id
                      })[0]
                  },
                  clients: function (ClientService) {
                      return ClientService.getList()
                  },
                  action: function () {
                    return action
                  }
              }
          })

          modalInstance.result
              .then(function () {
                  $state.go('.', $stateParams, {reload: true})
              })
              .catch(function (reason) {
                  console.info('Modal dismissed because of : ', reason)
              })
      }

      vm.delete = function (featureId) {

      }


  })
