'use strict'

angular
  .module('auth')
  .controller('LoginController', function (AuthService, $state, toastr, isLoggedIn) {
    var vm = this // create a view model to be used for binding

    // if user is logged in, navigate to home page
    if (isLoggedIn === true) {
      $state.go('home')
    }

    vm.user = {
      username: '',
      password: ''
    }

    vm.submit = function () {
      function onSuccess () {
        $state.go('home')
      }
      function onError () {
        toastr.error('Login failed, please try again with correct username and password.', 'User Login Error')
      }
      AuthService.login(vm.user)
        .then(onSuccess)
        .catch(onError)
    }
  })
