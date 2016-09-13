'use strict'

angular
    .module('app', [
        'home',
        'footer',
        'core',
        'navbar',
        'ngAnimate',
        'toastr',
        'anim-in-out',
        'auth'
    ])
    .run(function (IndexService) {
        IndexService.startup()
    })
