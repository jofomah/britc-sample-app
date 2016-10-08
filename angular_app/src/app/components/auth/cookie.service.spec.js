'use strict'
/* global describe, beforeEach, it, inject, expect, module, spyOn */

describe('CookieService', function () {
    beforeEach(module('auth'))

    var expectedKey = 'logged-in-user'

    describe('setCurrentUser', function () {
        var CookieService
        var $cookies

        beforeEach(inject(function (_CookieService_, _$cookies_) {
            CookieService = _CookieService_
            $cookies = _$cookies_

            spyOn($cookies, 'putObject').and.callThrough()
        }))

        it('should expose $cookies.putObject()', function () {
            var user = {
                username: 'testuser',
                password: 'testpass'
            }

            expect($cookies.putObject).not.toHaveBeenCalled()
            CookieService.setCurrentUser(user)

            expect($cookies.putObject.calls.mostRecent().args[0]).toBe(expectedKey)
            expect($cookies.putObject.calls.mostRecent().args[1]).toEqual(user)
        })
    })

    describe('getCurrentUser', function () {
        var CookieService
        var $cookies
        var user = {
            username: 'testuser',
            password: 'testpass'
        }

        beforeEach(inject(function (_CookieService_, _$cookies_) {
            CookieService = _CookieService_
            $cookies = _$cookies_
            spyOn($cookies, 'getObject').and.callThrough()
        }))

        it('should expose $cookies.getObject()', function () {
            expect($cookies.getObject).not.toHaveBeenCalled()
            CookieService.getCurrentUser()
            expect($cookies.getObject.calls.mostRecent().args[0]).toBe(expectedKey)
        })

        it('Should return expected current session object', function () {
            CookieService.remove() // clear any existing session
            expect(CookieService.getCurrentUser()).not.toEqual(user)
            CookieService.setCurrentUser(user) // save user object as cookie
            expect(CookieService.getCurrentUser()).toEqual(user)
        })
    })

    describe('remove', function () {
        var CookieService
        var $cookies
        var user = {
            username: 'testuser',
            password: 'testpass'
        }

        beforeEach(inject(function (_CookieService_, _$cookies_) {
            CookieService = _CookieService_
            $cookies = _$cookies_
            spyOn($cookies, 'remove').and.callThrough()
        }))

        it('Should expose $cookies.remove(key)', function () {
            expect($cookies.remove).not.toHaveBeenCalled()
            CookieService.remove()
            expect($cookies.remove).toHaveBeenCalledWith(expectedKey)
        })

        it('Should clear $cookie set with expected key', function () {
            CookieService.setCurrentUser(user)
            expect(CookieService.getCurrentUser()).toEqual(user)
            CookieService.remove() // clear current user
            expect(CookieService.getCurrentUser()).toBeUndefined()
        })
    })

    describe('isLoggedIn', function () {
        var CookieService
        var currentSession = {
            username: 'testuser',
            authToken: 'hashed-seesion-id-from-server'
        }

        beforeEach(inject(function (_CookieService_) {
            CookieService = _CookieService_
        }))

        it('Should return True if session is properly set i.e both username and authToken are set', function () {
            expect(CookieService.isLoggedIn()).not.toBeTruthy()
            CookieService.setCurrentUser(currentSession)
            expect(CookieService.isLoggedIn()).toBeTruthy()
        })

        it('Should return False if authToken is not part of session object', function () {
            CookieService.remove() // clear any existing session.
            expect(CookieService.getCurrentUser()).toBeUndefined()
            CookieService.setCurrentUser({username: 'testuser'})
            expect(CookieService.getCurrentUser()).toBeDefined()
            expect(CookieService.isLoggedIn()).toBeFalsy()
        })

        it('Should return False if username is not part of session object', function () {
            CookieService.remove() // clear any existing session.
            expect(CookieService.getCurrentUser()).toBeUndefined()
            CookieService.setCurrentUser({authToken: 'hashed-session-id-from-server'})
            expect(CookieService.getCurrentUser()).toBeDefined()
            expect(CookieService.isLoggedIn()).toBeFalsy()
        })
    })
})
