angular.module('home')
  .controller('HomeController', function ($uibModal, $state, $stateParams, toastr, FeatureService, featureRequests, cfpLoadingBar) {
      var vm = this
      vm.lastUpdate = null

      vm.onDragSaveSuccess = function (updatedRecord) {
          vm.lastUpdate = updatedRecord
      }

      vm.closeAlert = function () {
          vm.lastUpdate = null
      }

      vm.dragControlListeners = {
          //optional param
          containment: '#blocks',
          orderChanged: function (event) {
              var updatedFeature = FeatureService.rearrange(event.dest.index, event.dest.sortableScope.modelValue)
              var errMsg = ['An error occurred while updating: <b>',  updatedFeature.title, '</b>'].join(' ')
              var errTitle = 'Error'
              cfpLoadingBar.start()
              FeatureService.save(updatedFeature)
                  .then(vm.onDragSaveSuccess)
                  .catch(toastr.error.bind(toastr, errMsg, errTitle))
                  .finally(cfpLoadingBar.complete.bind(cfpLoadingBar))
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
                      return FeatureService.getItemFrom(vm.features, featureId)
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
