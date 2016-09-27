'use strict'
/**
 * @ngdoc service
 * @name app.service:IndexService
 * @requires $log
 * @requires $rootScope
 * @requires $state
 * @requires auth.service:CookieService
 * @requires toastr
 * @description IndexService is used to bootstrap this application on startup, by setting application wide event listeners
 *
 */
angular.module('app')
    .service('IndexService', function ($log, $rootScope, CookieService, $state, toastr) {
        function onError(event, toState, toParams, fromState, fromParams, err) {
            $log.error(err)
        }

        /**
         * @ngdoc method
         * @name authenticateUser
         * @methodOf app.service:IndexService
         * @description private
         * - This is used to check if a valid user session exists on state transition,
         * it takes user to login page if a valid session does not exist and user tries to navigate to restricted state
         *
         * @returns {undefined} returns nothing
         */
        function authenticateUser(event, toState) {
            // if user session does not exist and user tries to navigate to another state except login, take user to login page
            if (!CookieService.isLoggedIn() && toState && toState.name !== 'login') {
                $state.transitionTo('login')
                event.preventDefault()
            }
        }

        /**
         * @ngdoc method
         * @name onAuthError
         * @methodOf app.service:IndexService
         * @description private
         * - Authentication error event handler (private)
         *
         * @returns {undefined} returns nothing
         */
        function onAuthError(err) {
            toastr.error('Invalid username and/or password', 'Authentication Error')
            $log.error(err)
            $state.go('login')
        }

        /**
         * @ngdoc method
         * @name startup
         * @methodOf app.service:IndexService
         * @description This add application wide event listeners such as
         * - '$stateChangeError'
         * - '$stateChangeStart'
         * - 'unauthorized'
         * @returns {undefined} returns nothing
         */
        this.startup = function () {
            // Track and log state change error
            $rootScope.$on('$stateChangeError', onError)

            // Ensure that user is logged in on state transition
            $rootScope.$on('$stateChangeStart', authenticateUser)

            // Handle unauthorized event emission
            $rootScope.$on('unauthorized', onAuthError)
        }
    })
