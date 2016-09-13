'use strict'
/* global describe, beforeEach, it, inject, expect, module */

describe('FooterController', function () {
  beforeEach(module('footer', 'app'))

  var FooterController

  beforeEach(inject(function ($controller) {
    FooterController = $controller('FooterController', {})
  }))

  it('should be defined', function () {
    expect(FooterController).toBeDefined()
  })

  it('should expose year and it should match current year', function () {
    var expectedYear = new Date().getFullYear()
    expect(FooterController.year).toBe(expectedYear)
  })
})
