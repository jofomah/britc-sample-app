'use strict'

angular.module('navbar')
  .controller('NavbarController', function (NavbarService) {
    var vm = this

    vm.name = 'BritCore Sample App'

    vm.items = NavbarService.get()

    vm.isCollapsed = true

    /**
     * @ngdocs method
     * @name toggleCollapse
     * @methodOf navbar.controller:NavbarController
     * @description This is to toggle (i.e collapse or show) menu on small screens
     * @returns {undefined} It doesn't return anything
     */
    vm.toggleCollapse = function () {
      vm.isCollapsed = !vm.isCollapsed
    }
  })

