'use strict'

angular.module('config', [])
    .constant('config', {
        api: {
            url: 'http://localhost:5000/api',
            feature: 'feature_requests',
            client: 'clients',
            login: 'login',
            logout: 'http://localhost:5000/auth/logout'
        }
    })
