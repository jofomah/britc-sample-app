'use strict'

angular.module('navbarCtrlMock', [])
  .constant('config', {
    name: 'BritCore Sample App'
  })
  .constant('navbarItemsMock', [
    {
      name: 'parent',
      label: 'Parent',
      roles: [
        'boss'
      ]
    }
  ])
