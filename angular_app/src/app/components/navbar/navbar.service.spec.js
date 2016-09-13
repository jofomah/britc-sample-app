'use strict'
/* global describe, beforeEach, it, inject, expect, module */

describe('navbarService', function () {
  beforeEach(module('navbar', 'navbarMock'))

  describe('updateItems', function () {
    var navbarService

    beforeEach(inject(function (_NavbarService_) {
      navbarService = _NavbarService_
    }))

    it('should only include one state of a given hierarchy', function () {
      var result = navbarService.get()
      expect(result.length).toEqual(1)
    })
  })
})
