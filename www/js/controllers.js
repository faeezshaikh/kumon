angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$rootScope,$timeout,$ionicScrollDelegate) {})


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
	        if($state.current.name == '') {
	      	  $state.go('tab.topics');
//	      	  $window.location.href = "#/app/chat/";
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


.controller('ChatsCtrl', function($scope,FIREBASE_URL,$firebaseArray,$ionicScrollDelegate,PersonService) {
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

.controller('AccountCtrl', function($scope) {
  var card = {
    "category":"",
    "front": "",
    "back":""
  };
})




;
