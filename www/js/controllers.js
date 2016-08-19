angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$rootScope,$timeout,$ionicScrollDelegate) {

	
	// Kumon color code : #7DCDF4;
	$scope.title = "Home";
	$scope.titleColor = "myColor";
	$scope.topics = [{"title":"Vocbulary","url":"http://a1.mzstatic.com/us/r30/Purple/v4/33/10/28/331028e2-eaae-d915-6828-866121dbca31/icon256.png","length":29},
	                 {"title":"Science","url":"http://www.iconarchive.com/download/i43037/oxygen-icons.org/oxygen/Categories-applications-science.ico"},
	                 {"title":"Algebra","url":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Icon_Mathematical_Plot.svg/2000px-Icon_Mathematical_Plot.svg.png"},
	                 {"title":"Geometry","url":"http://www.freeiconspng.com/uploads/geometry-icon-30.jpg"}];
	
	$scope.cards = [{"front":"2+3","back":"5"},{"front":"whats your name?","back":"Maryam.sdfsdfdsfhsdifhos;idhfois"}];
	  // FLIP
	//	  $('#flipper').bind('click', function(){
	//	    $('.cardx.current').toggleClass('flip');
	//	  });
	  
	  $scope.spin = function() {
		  console.log('spin');
		  $('.cardx.current').toggleClass('flip');
	  }
	  
	  $scope.next = function() {
		  console.log('next called');
		  myCycle();
	  }
	  
	  function myCycle() {
		  console.log('my cycle');
	  
		  // CYCLE
		  $('#deck').cycle({
		    after:   onAfter,
		    before:  onBefore,
		    fx:      'shuffle',
		    next:    '#next',
		    prev:    '#prev',
		    shuffle: {
		      top:   -300,
		      left:  20
		    },
		    speed:   'fast',
		    timeout: 0,
		  });
		  
	  }
	  
		  function init(){
			  
			  $timeout(myCycle,10);
//			  myCycle;
			  
		  }
		  init();
		  
	  function onBefore(){
	    $(this).parent().find('.current').removeClass('current');
	  }
	  function onAfter(){
//		  console.log('On after');
	    $(this).addClass('current');
	  }
	  
	  $scope.vocabClicked = function() {
			$scope.cards = [{"front":"isolated","back":"alone"},{"front":"facetious","back":"wth!"}];
			$scope.title = "Vocabulary Flashcards";
			init();
			
	  }
	  
	  $scope.topicSelected = function(topic){
			$scope.title = topic.title + ' Flashcards';
			init();
			$ionicScrollDelegate.$getByHandle('show-page').scrollTop(true);
	  }

	  
	  $scope.mathClicked = function() {
			$scope.cards = [{"front":"2 + 5","back":"7"},{"front":"8 ÷ 2","back":"4"},{"front":"6 X 3","back":"18"}];
			$scope.title = "Math Flashcards";
			init();
			
	  }

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
