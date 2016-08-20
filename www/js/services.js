angular.module('starter.services', [])


.factory('CardService',function(){

	var map ={1:{"topic" : "Vocabulary", "cards" : [{"front":"2+3","back":"5"},{"front":"whats your name?","back":"Maryam Shaikh"},{"front":"2+3","back":"5"}]},
				2 : {"topic" : "Math", "cards" :  [{"front":"Whats your name?","back":"Maryam"},{"front":"How old are you?","back":"5"}]}};
	 

	  return {
	    getCardsForTopic: function(topicId) {
	      return map[topicId].cards;
	    },
	    getTitleForTopic: function(topicId) {
		      return map[topicId].topic;
		    }
	  };

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
