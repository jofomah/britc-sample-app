'use strict'
// standard-js third party global variable declaration to avoid namespace pollution
/* global describe, beforeEach, it, inject, expect, module, jasmine */

describe('module: app', function () {
    var IndexService

    beforeEach(function () {
        module('app', function ($provide) {
            $provide.value('IndexService', {
                startup: jasmine.createSpy('startup')
            })
        })

        inject(function (_IndexService_) {
            IndexService = _IndexService_
        })
    })

    it('should call IndexService.startup() on index run() block', function () {
        expect(IndexService.startup).toHaveBeenCalled()
    })
})
