'use strict'
/* global describe, beforeEach, it, inject, expect, module, spyOn */

describe('NavbarCtrl', function () {
  beforeEach(module('navbar', 'navbarMock', 'navbarCtrlMock'))

  var NavbarCtrl
  var CookieService
  var expectedName

  beforeEach(inject(function ($controller, $rootScope, config, _CookieService_) {
    expectedName = config.name
    NavbarCtrl = $controller('NavbarController', {
      userStates: [],
      $scope: $rootScope.$new()
    })

    CookieService = _CookieService_
  }))

  it('should expose the application name', function () {
    expect(NavbarCtrl.name).toBe(expectedName)
  })
})
