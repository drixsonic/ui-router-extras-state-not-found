(function() {
  angular
    .module('app', ['ui.router', 'ct.ui.router.extras', 'oc.lazyLoad'])
    .config(function($locationProvider, $stateProvider, $futureStateProvider, $ocLazyLoadProvider, $urlRouterProvider) {

      // Set the app module as loaded
      $ocLazyLoadProvider.config({
        loadedModules: ['app'],
        debug: true
      });

      // Use pushState for URLs
      $locationProvider.html5Mode(true);

      // No state found
      $urlRouterProvider.otherwise('/404');

      // Now set up the states
      $stateProvider
        .state('home', {
          url: '/',
          views: {
            'view': {
              templateUrl: '/home.html'
            }
          }
        })
        .state('404', {
          url: '/404',
          views: {
            'view': {
              templateUrl: '/404.html'
            }
          },
          resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            load: ['$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load('/lazy.js');
              }
            ]
          }
        });

      // Future state factory
      $futureStateProvider.stateFactory('ocLazyLoad', function($q, $ocLazyLoad, futureState) {
        var deferred = $q.defer();

        $ocLazyLoad.load(futureState.load).then(function() {
          deferred.resolve();
        }, function() {
          deferred.reject();
        });

        return deferred.promise;
      });

      // The future (lazy loaded) states of the application
      var futureState = {
        type: 'ocLazyLoad',
        stateName: 'mailbox',
        urlPrefix: '/mailbox',
        load: [{
          name: 'mailbox',
          files: ['/mailbox.js']
        }, {
          files: ['/mailbox.html', '/message.html', '/write.html']
        }]
      };

      $futureStateProvider.futureState(futureState);
    }).run(function($ocLazyLoad) {
      $ocLazyLoad.load('/normalize.css');
    });
})();
