(function() {
  angular
    .module('mailbox', ['ui.router'])
    .config(['$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('mailbox', {
            url: '/mailbox',
            views: {
              'view': {
                templateUrl: '/mailbox.html'
              }
            }
          })
          .state('mailbox/message', {
            url: '/mailbox/message',
            views: {
              'view': {
                templateUrl: '/message.html'
              }
            }
          })
          .state('mailbox/write', {
            url: '/mailbox/write',
            views: {
              'view': {
                templateUrl: '/write.html'
              }
            }
          });
      }
    ]);
})();
