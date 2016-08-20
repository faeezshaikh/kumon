angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$rootScope,$timeout,$ionicScrollDelegate) {

	
	// Kumon color code : #7DCDF4;
	$scope.title = "Home";
	$scope.titleColor = "myColor";
	$scope.topics = [{"title":"Vocbulary","url":"http://a1.mzstatic.com/us/r30/Purple/v4/33/10/28/331028e2-eaae-d915-6828-866121dbca31/icon256.png","length":29},
	                 {"title":"Science","url":"http://www.iconarchive.com/download/i43037/oxygen-icons.org/oxygen/Categories-applications-science.ico"},
	                 {"title":"Algebra","url":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Icon_Mathematical_Plot.svg/2000px-Icon_Mathematical_Plot.svg.png"},
	                 {"title":"Geometry","url":"http://www.freeiconspng.com/uploads/geometry-icon-30.jpg"},
	                 {"title":"Custom 1","url":"http://www.freeiconspng.com/uploads/geometry-icon-30.jpg"},
	                 {"title":"Custom 2","url":"http://www.freeiconspng.com/uploads/geometry-icon-30.jpg"},
	                 {"title":"Custom 3","url":"http://www.freeiconspng.com/uploads/geometry-icon-30.jpg"},
	                 {"title":"Custom 4","url":"http://www.freeiconspng.com/uploads/geometry-icon-30.jpg"}];
	
	$scope.cards = [{"front":"2+3","back":"5"},{"front":"whats your name?","back":"Maryam Shaikh"}];

	$scope.spin = function() {
		  console.log('spin');
		  $('.cardx.current').toggleClass('flip');
	  }
	  
	  $scope.next = function() {
		  console.log('next called');
		  myCycle();
	  }
	  function init(){
		  $timeout(myCycle,10);
	  }
	  init();
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
	  
		  
	  function onBefore(){
	    $(this).parent().find('.current').removeClass('current');
	  }
	  function onAfter(){
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

.controller('LoginCtrl',function($scope,FIREBASE_URL,$firebaseAuth,$rootScope,$state,$window,PersonService) {
	
	   $scope.ameren = {'username':'','password':''};
	   var chatRef = new Firebase(FIREBASE_URL);
	    var auth = $firebaseAuth(chatRef);
	  $scope.isFormValid = function() {
	  	  if($scope.ameren.username &&  $scope.ameren.password  )  {
	  		  return true;
	  	  }
	  	  return false;
	    }
	    
	    
	    $scope.login = function(socialPlatform) {
	      $scope.loginProgress = true;
	      auth.$authWithOAuthPopup(socialPlatform).then(function(authData) {
	        console.log("Logged in as:", authData.uid);
	        $scope.loggedIn = true;
	        $scope.loginProgress = false;
	        PersonService.SetLoginState(true);
	      }).catch(function(error) {
	        console.log("Authentication failed:", error);
	        $scope.loginProgress = false;
	        console.log(error);
	        $scope.msg = "";
	        $("#loginPage").effect("shake", {
	          times: 4
	        }, 1000);
	      });
	    }
	    
	    $scope.submitForm = function() {
	  	    $("#loginPage").effect("shake", {
	  	        times: 4
	  	      }, 1000);
	    }

	    $scope.logout = function() {
	  	  PersonService.SetLoginState(false);
	      chatRef.unauth();
	      $scope.msg = "Signing out of chat..";
	      $scope.loggedIn = false;
	      $scope.loginProgress = true;
	      $state.go("tab.login"); // adding this for device.. location.href doesnt work on device
	      $window.location.reload();

	    }
	    
	    auth.$onAuth(function(authData) {
	      // Once authenticated, instantiate Firechat with our user id and user name
	      if (authData) {
	        $scope.loginProgress = false;
	        $scope.loggedIn = true;
	        $rootScope.currentUser = "user";
	        $scope.explModal.hide();
//	        $window.location.href = "#/app/chat/";
	        console.log('Chat controller. State name = ',$state.current.name);
	        if($state.current.name == 'app.chat') {
	      	  $state.go('app.chat');
//	      	  $window.location.href = "#/app/chat/";
	        } else {
	      	  $state.go('tab.dash');
	      	 // $window.location.href = "#/app/feeds";
	        }
	        if (authData.provider == 'facebook') {
	          $scope.userName = authData.facebook.displayName;
	          $scope.userImg = authData.facebook.profileImageURL;
	          $scope.userEmail = authData.facebook.email; // Email works only if user has exposed.
	          PersonService.SetAvatar(authData.facebook.profileImageURL);
	          PersonService.SetUserDetails($scope.userName,$scope.userImg,$scope.userEmail,authData.facebook.displayName);
	        }
	        if (authData.provider == 'twitter') {
	          $scope.userName = authData.twitter.displayName;
	          $scope.userImg = authData.twitter.profileImageURL;
	          $scope.userEmail = authData.twitter.email;
	          PersonService.SetAvatar(authData.twitter.profileImageURL);
	          PersonService.SetUserDetails($scope.userName,$scope.userImg,$scope.userEmail,authData.twitter.displayName);
	        }
	        if (authData.provider == 'google') {
	          $scope.userName = authData.google.displayName;
	          $scope.userImg = authData.google.profileImageURL;
	          $scope.userEmail = authData.google.email;
	          PersonService.SetAvatar(authData.google.profileImageURL);
	          PersonService.SetUserDetails($scope.userName,$scope.userImg,$scope.userEmail,authData.google.displayName);
	        }
	        if (authData.provider == 'github') {
	            $scope.userName = authData.github.displayName;
	            $scope.userImg = authData.github.profileImageURL;
	            $scope.userEmail = authData.github.email;
	            PersonService.SetAvatar(authData.github.profileImageURL);
	            PersonService.SetUserDetails($scope.userName,$scope.userImg,$scope.userEmail,authData.github.displayName);
	          }
	      }
	    });
	    
})


.controller('ChatsCtrl', function($scope, Chats,FIREBASE_URL,$firebaseArray,$ionicScrollDelegate,PersonService) {
	$scope.data = {
			messages: [],
			message: '',
			loading: true,
			showInfo: false
		};
	var messagesRef = new Firebase(FIREBASE_URL + '/messages');
	
	function loadMessages()  {
		var query = messagesRef
		.limitToLast(200);
		$scope.data.messages = $firebaseArray(query);
		
		console.log('messages',$scope.data.messages);
		
		$scope.data.messages.$loaded().then(function (data) {
			$scope.data.loading = false;
			$ionicScrollDelegate.$getByHandle('show-page').scrollBottom(true);
		});
	}
	loadMessages();
	
	
	$scope.sendMessage = function () {

		if ($scope.data.message) {
			$scope.data.messages.$add({
				text: $scope.data.message,
				username: getName(),
				profilePic: getImg(),
				timestamp: new Date().getTime()
			});
			
			$scope.data.message = '';
		
			$ionicScrollDelegate.$getByHandle('show-page').scrollBottom(true);
		}

	};
	
	function getName() {
		return PersonService.GetUserDetails().name;
	};
	
	function getImg() {
		console.log(PersonService.GetAvatar());
		return PersonService.GetAvatar();
	};
	
	$scope.isThisMe = function(name,profilePic) {
		if(PersonService.GetUserDetails().name == name && PersonService.GetUserDetails().img == profilePic) {
			return true;
		}
		return false;
	}
	
	
	

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  var card = {
    "category":"",
    "front": "",
    "back":""
  };
  
  $scope.cards = [];
  $scope.submit = function(c) {
	  $scope.cards.push(c);
	  console.log('Added',$scope.cards);
//	  card.front = '';
//	  card.back = '';
  }
  
  
})



.factory('PersonService', function($http) {
	  var avatar,loginState;
	  var loggedinUser = {};


	  return {
		
		  SetLoginState: function(val) {
			  loginState = val;
		  },
		  GetLoginState: function() {
			  return loginState;
		  },
		  SetUserDetails: function(name,img,email,displayName) {
			  loggedinUser.name = name;
			  loggedinUser.img = img;
			  loggedinUser.email = email;
			  loggedinUser.displayName = displayName;
		  },
		  GetUserDetails: function() {
			  return loggedinUser;
		  },
		  GetAvatar : function() {
			  return avatar;
		  },
		  SetAvatar: function(url) {
			  avatar = url;
		  }
	  }
	})


;
