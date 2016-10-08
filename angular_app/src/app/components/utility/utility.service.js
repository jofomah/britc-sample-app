'use strict'

angular.module('utility')
  .service('Utility', function () {
      this.getResponse = function (res) {
          return (res && res.data) || res
      }
  })

