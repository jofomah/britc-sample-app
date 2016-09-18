'use strict'

angular
    .module('app', [
        'config',
        'home',
        'footer',
        'core',
        'navbar',
        'auth',
        'feature',
        'clients',
        // third party libs
        'ngAnimate',
        'toastr',
        'anim-in-out',
        'nya.bootstrap.select'
    ])
    .run(function (IndexService) {
        IndexService.startup()
    })
