'use strict'
/* global describe, beforeEach, it, inject, expect, module, spyOn, afterEach */

describe('IndexService', function () {
    beforeEach(module('app'))

    describe('startup', function () {
        var $log
        var $rootScope
        var CookieService
        var $state

        beforeEach(inject(function (_$rootScope_, _$log_, _CookieService_, _$state_) {
            $rootScope = _$rootScope_
            $log = _$log_
            CookieService = _CookieService_
            $state = _$state_

            spyOn($rootScope, '$on').and.callThrough()
            spyOn($log, 'error').and.callFake(function () { })
            spyOn(CookieService, 'getCurrentUser').and.callThrough()
            spyOn($state, 'transitionTo')
            spyOn($state, 'go')
        }))

        it('Should call $rootScope.$on("$stateChangeError") when "$stateChangeError" is emitted.', function () {
            expect($log.error).not.toHaveBeenCalled()
            var toState = 'nextState'
            var toParams = {}
            var fromState = {}
            var fromParams = {}
            var err = {}
            // event argument is auto inserted so leave it out
            $rootScope.$emit('$stateChangeError', toState, toParams, fromState, fromParams, err)
            expect($log.error).toHaveBeenCalledWith(err)
        })

        it('Should NOT call $state.transitionTo("login") when "$stateChangeStart" is emitted and current user session is DEFINED', function () {
            var validUserSession = {
                status: 'success',
                username: 'testuser',
                authToken: 'hashed-seesion-id-from-server'
            }
            CookieService.setCurrentUser(validUserSession)
            var currentSession = CookieService.getCurrentUser()
            expect(currentSession).toEqual(validUserSession)
            // since toState.name is not equal to login it will trigger $state.transitionTo() only if currentSession is DEFINED
            var toState = {name: 'home'}
            expect($state.transitionTo).not.toHaveBeenCalled()
            // event argument is auto inserted so leave it out
            $rootScope.$emit('$stateChangeStart', toState)
            expect($state.transitionTo).not.toHaveBeenCalledWith('login')
        })

        it('Should NOT call $state.transition("login") if toState.name === "login" and session is DEFINED', function () {
            // This should skip calling $state.transitionTo() if Current session is set and toState.name === "login"
            var validUserSession = {
                status: 'success',
                username: 'testuser',
                authToken: 'hashed-seesion-id-from-server'
            }
            CookieService.setCurrentUser(validUserSession)
            var currentSession = CookieService.getCurrentUser()
            expect(currentSession).toEqual(validUserSession)
            var toState = {name: 'login'}
            expect($state.transitionTo).not.toHaveBeenCalled()
            // event argument is auto inserted so leave it out
            $rootScope.$emit('$stateChangeStart', toState)
            expect($state.transitionTo).not.toHaveBeenCalled()
        })

        it('Should call $state.transition("login") if toState.name !== "login" AND current session is NOT set properly', function () {
            var currentSession = CookieService.getCurrentUser()
            expect(angular.isObject(currentSession)).toBeFalsy()
            var toState = {name: 'home'}
            expect($state.transitionTo).not.toHaveBeenCalled()
            // event argument is auto inserted so leave it out
            $rootScope.$emit('$stateChangeStart', toState)
            expect($state.transitionTo).toHaveBeenCalled()
        })

        it('Should call $state.go("login") if "unauthorized" event is emitted', function () {
            expect($state.go).not.toHaveBeenCalled()
            expect($log.error).not.toHaveBeenCalled()
            // event argument is auto inserted so leave it out
            var err = {status: 401}
            $rootScope.$emit('unauthorized', err)
            expect($log.error).not.toHaveBeenCalledWith(err)
            expect($state.go).toHaveBeenCalledWith('login')
        })

        afterEach(function () {
            // reset call to $rootScope.$on('$stateChangeError', toState, toParams, fromState, fromParams, err)
            $rootScope.$on.calls.reset()
            $state.transitionTo.calls.reset()
            $state.go.calls.reset()
            // clear any session set inside a test 'it' block
            CookieService.remove()
        })
    })
})
