'use strict'
/**
 * @ngdoc controller
 * @name footer.controller:FooterController
 * @description simple footer controller
 * @requires app.constant:config
 *
 */
angular.module('footer')
  .controller('FooterController', function () {
    var vm = this
    vm.year = new Date().getFullYear()
    vm.version = 'beta'
  })
