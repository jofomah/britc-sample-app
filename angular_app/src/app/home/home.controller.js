angular.module('home')
  .controller('HomeController', function ($uibModal, $state, $stateParams, FeatureService, featureRequests, $scope) {
      var vm = this

      vm.dragControlListeners = {
          //optional param
          containment: '#blocks',
          orderChanged: function (event) {
              //console.log('Source : ', event.source.index, event.source.itemScope.modelValue)
              // console.log('Dest : ', event.dest.index, event.dest.sortableScope.modelValue)
              // console.log('Order Changed : ', 'Dest : ', event.dest.sortableScope, 'Source :', event.source.sortableScope.modelValue)
              // TODO: persist after sorting
          },
          clone: false, //optional param for clone feature.
          allowDuplicates: false, //optional param allows duplicates to be dropped.
      };

      vm.keyword = ''
      vm.features = FeatureService.sortFeatureBy(featureRequests)
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
  })
