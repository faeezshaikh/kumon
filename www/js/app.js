// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','auth0','timer','firebase','ngCordova'])


.constant('FIREBASE_URL','https://kumon.firebaseio.com/')
.run(function($ionicPlatform,$rootScope,$ionicModal,auth) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
//  $rootScope.digestTtl(20);
  /// Login  /////
  
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams,$location) {
	    var requireLogin = toState.data.requireLogin;

	    if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
	      event.preventDefault();
	      // get me a login modal!
	      $ionicModal.fromTemplateUrl('templates/login.html', {
				scope : $rootScope
			}).then(function(modal) {
				$rootScope.explModal = modal;
				$rootScope.explModal.show();
			});
	    }
	  });
  
  //// Login /////
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    	controller: 'DashCtrl',
        data: {
          requireLogin: true
        }
  })

  // Each tab has its own nav history stack:
    .state('tab.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html',
            controller: ''
          }
        }
      })

  .state('tab.topics', {
    url: '/topics',
    views: {
      'tab-topics': {
        templateUrl: 'templates/topics.html',
        controller: 'TopicsCtrl'
      }
    }
  })
   .state('tab.topic', {
    url: '/topics/:topicId',
    views: {
      'tab-topics': {
        templateUrl: 'templates/topic.html',
        controller: 'TopicCtrl'
      }
    }
  })
   .state('tab.topic-manage', {
    url: '/topics/:topicId/manage',
    views: {
      'tab-topics': {
        templateUrl: 'templates/topic-manage.html',
        controller: 'TopicCtrl'
      }
    }
  })
  
  

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/settings.html',
        controller: 'AccountCtrl'
      }
    }
  })
  
    .state('tab.share', {
    url: '/share',
    views: {
      'tab-share': {
        templateUrl: 'templates/share.html',
        controller: 'SocialShareCtrl'
      }
    }
  })
  
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/topics');

});
