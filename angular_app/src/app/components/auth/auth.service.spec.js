'use strict'
/* global describe, beforeEach, it, inject, expect, module, spyOn */

var loginApiUrl = 'http://localhost:5000/api/login'
var logoutApiUrl = 'http://localhost:5000/auth/logout'

describe('AuthService', function () {
    beforeEach(module('auth'))

    describe('Login', function () {
        var AuthService
        var $http

        beforeEach(inject(function (_AuthService_, _$http_) {
            AuthService = _AuthService_
            $http = _$http_
            spyOn($http, 'post').and.callThrough()
        }))

        it('should make $http call to current login API url with expected parameters', function () {
            var user = {
                username: 'testuser',
                password: 'testpass'
            }
            expect($http.post).not.toHaveBeenCalled()
            AuthService.login(user)
            expect($http.post.calls.mostRecent().args[0]).toEqual(loginApiUrl)
            expect($http.post.calls.mostRecent().args[1]).toEqual(user)
        })
    })

    describe('Logout', function () {
        var AuthService
        var $http
        beforeEach(inject(function (_AuthService_, _$http_) {
            AuthService = _AuthService_
            $http = _$http_
            spyOn($http, 'get').and.callThrough()
        }))

        it('should make $http call to expected logout API url', function () {
            expect($http.get).not.toHaveBeenCalled()
            AuthService.logout()
            expect($http.get.calls.mostRecent().args[0]).toEqual(logoutApiUrl)
        })
    })
})
