'use strict'

/* global describe, beforeEach, it, inject, expect, module, spyOn, afterEach */

describe('AuthInterceptor Spec', function () {
    var httpProvider
    var CookieService
    var AuthInterceptor
    var $rootScope

    beforeEach(function () {
        module('auth', 'app', function ($httpProvider) {
            httpProvider = $httpProvider
        })

        inject(function (_CookieService_, _AuthInterceptor_, _$rootScope_) {
            CookieService = _CookieService_
            AuthInterceptor = _AuthInterceptor_
            $rootScope = _$rootScope_
            // fake call to $rootScope.$emit()
            spyOn($rootScope, '$emit').and.returnValue({preventDefault: true})
            spyOn(CookieService, 'remove').and.callThrough()
        })
    })

    describe('AuthInterceptor.request()', function () {
        it('should CookieService be defined', function () {
            expect(CookieService).toBeDefined()
        })

        it('Should AuthInterceptor be defined', function () {
            expect(AuthInterceptor).toBeDefined()
        })

        it('should have the AuthInterceptor as an interceptor', function () {
            expect(httpProvider.interceptors).toContain('AuthInterceptor')
        })

        it('Should expect AuthInterceptor.request(config) add "authToken" to config.params if config.url is not a link to html file', function () {
            var currentSession = {
                username: 'testuser',
                authToken: 'hashed-seesion-id-from-server'
            }
            CookieService.setCurrentUser(currentSession) // set session
            var config = {
                url: 'http://localhost:3000/api'
            }
            var result = AuthInterceptor.request(config)
            expect(result.params.auth_token).toBe(currentSession.authToken)
        })

        it('Should not override config.params object but extend it instead if session id is set', function () {
            var currentSession = {
                username: 'testuser',
                authToken: 'hashed-seesion-id-from-server'
            }
            CookieService.setCurrentUser(currentSession) // set session
            var config = {
                params: {
                    clientId: 'nice-video-id-hash'
                },
                url: 'http://localhost:3000/api'
            }
            var result = AuthInterceptor.request(config)
            expect(result.params.auth_token).toBe(currentSession.authToken)
        })

        it('Should expect AuthInterceptor.request(config) NOT to modify html file requests', function () {
            var currentSession = {
                username: 'testuser',
                authToken: 'hashed-seesion-id-from-server'
            }
            CookieService.setCurrentUser(currentSession) // set session
            var config = {
                url: 'http://localhost:3000/api.html'
            }
            var result = AuthInterceptor.request(config)
            expect(result).toBe(config)
        })

        it('Should expect AuthInterceptor.request(config) NOT to if authToken is not set', function () {
            var currentSession = {
                username: 'testuser'
            }
            CookieService.setCurrentUser(currentSession) // set session
            var config = {
                url: 'http://localhost:3000/api.html'
            }
            var result = AuthInterceptor.request(config)
            expect(result).toBe(config)
        })
    })

    describe('AuthInterceptor.responseError()', function () {
        it('Should emit "unauthorized" event when called with response status 401', function () {
            var unauthorizedResponse = {status: 401}
            expect($rootScope.$emit).not.toHaveBeenCalled()
            AuthInterceptor.responseError(unauthorizedResponse)
            expect($rootScope.$emit).toHaveBeenCalledWith('unauthorized')
        })

        it('Should clear stale user session cookie when response status code is 401', function () {
            var unauthorizedResponse = {status: 401}
            expect(CookieService.remove).not.toHaveBeenCalled()
            AuthInterceptor.responseError(unauthorizedResponse)
            expect(CookieService.remove).toHaveBeenCalled()
        })

        it('Should NOT modify response error object if status is NOT 401', function () {
            var unauthorizedResponse = {status: 404}
            AuthInterceptor.responseError(unauthorizedResponse)
            expect(CookieService.remove).not.toHaveBeenCalled()
            expect($rootScope.$emit).not.toHaveBeenCalled()
        })
    })

    afterEach(function () {
        // reset call to $rootScope.$emit()
        $rootScope.$emit.calls.reset()
    })
})
