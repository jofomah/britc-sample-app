'use strict'
/* global describe, beforeEach, it, inject, expect, module, spyOn */

describe('LoginController', function () {
    beforeEach(module('auth'))

    var LoginController
    var AuthService
    var $state

    beforeEach(inject(function ($controller, _AuthService_, _$state_) {
        AuthService = _AuthService_
        $state = _$state_

        LoginController = $controller('LoginController', {
            AuthService: AuthService,
            $state: $state,
            isLoggedIn: false
        })

        spyOn(AuthService, 'login').and.callThrough()
    }))

    it('should be defined', function () {
        expect(LoginController).toBeDefined()
    })

    it('Should expose user object with username and password properties initialised to empty string', function () {
        expect(LoginController.user.username).toBe('')
        expect(LoginController.user.password).toBe('')
    })

    it('Should expose submit() that calls AuthService.login() with LoginController.user object', function () {
        LoginController.user.username = 'testuser'
        LoginController.user.password = 'testpassword'
        expect(AuthService.login).not.toHaveBeenCalled()
        LoginController.submit()
        expect(AuthService.login).toHaveBeenCalledWith(LoginController.user)
    })

    describe('State change if  isLoggedIn is True', function () {
        var state
        var isLoggedIn

        beforeEach(inject(function ($controller, _AuthService_, _$state_) {
            state = _$state_
            isLoggedIn = true

            spyOn(state, 'go')

            // Mimic that user is currently logged in by setting isLoggedIn to true
            $controller('LoginController', {
                AuthService: _AuthService_,
                $state: state,
                isLoggedIn: isLoggedIn
            })
        }))

        it('Should navigate to home state if user is already logged in', function () {
            expect(state.go).toHaveBeenCalledWith('home')
        })
    })

    describe('State change if  isLoggedIn is False', function () {
        var state
        var isLoggedIn
        beforeEach(inject(function ($controller, _AuthService_, _$state_) {
            state = _$state_
            isLoggedIn = false
            spyOn(state, 'go')

            // Mimic that user is currently logged in by setting isLoggedIn to true
            $controller('LoginController', {
                AuthService: _AuthService_,
                $state: state,
                isLoggedIn: isLoggedIn
            })
        }))

        it('Should NOT navigate to home state if user has NOT logged in', function () {
            expect(state.go).not.toHaveBeenCalledWith('home')
        })
    })
})
