angular.module('starter.services', [])


.factory('CardService',function(){
	
//		http://a1.mzstatic.com/us/r30/Purple/v4/33/10/28/331028e2-eaae-d915-6828-866121dbca31/icon256.png
	var decks =[
			{"id":1,"topic" : "Vocabulary", "url":"img/vocab.png","cards" : [{"category":"Vocabulary","front":"belie","back":"to misrepresent (verb)"},{"category":"Vocabulary","front":"veracious","back":"truthful (adj)"},{"category":"Vocabulary","front":"iconoclast","back":"who attacks cherished beliefs (noun)"},{"category":"Vocabulary","front":"undermine","back":"to weaken (verb)"}]},
			{"id":2, "topic" : "Science", "url":"img/science.ico","cards" :  [{"category":"Science","front":"Whats your name?","back":"Maryam"},{"category":"Science","front":"How old are you?","back":"5"}]},
			{"id":3, "topic" : "Algebra", "url":"img/algebra.png","cards" :  [{"category":"Algebra","front":"13 + 7","back":"20"},{"category":"Algebra","front":"11 + 7","back":"18"},{"category":"Algebra","front":"9 + 7","back":"16"},{"category":"Algebra","front":"20 + 7","back":"27"},{"category":"Algebra","front":"19 + 3","back":"22"},{"category":"Algebra","front":"8 + 3","back":"11"},{"category":"Algebra","front":"15 + 6","back":"21"}]},
			{"id":4, "topic" : "Geometry", "url":"img/geometry.jpg","cards" :  [{"category":"Geometry","front":"Whats your name?","back":"Maryam"},{"category":"Geometry","front":"How old are you?","back":"5"}]},
			{"id":5, "topic" : "Custom 1", "url":"img/custom.png","cards" :  [{"category":"Custom 1","front":"Whats your name?","back":"Maryam"},{"category":"Custom 1","front":"How old are you?  sddsfs","back":"5"}]},
			{"id":6, "topic" : "Custom 2", "url":"img/custom.png","cards" :  [{"category":"Custom 2","front":"Whats your name?","back":"Maryam"},{"category":"Custom 2","front":"How old are you?","back":"5"}]}
			];
 
	function findDeckForTopicId(topicId) {
    	for(i=0;i<decks.length;i++){
    		if(decks[i].id == topicId) {
    			return decks[i];		
    		}
    	}
    	return [];
	}
	  return {
		getTopics : function() {
			return decks;
		},
	    getCardsForTopic: function(topicId) {
	    	var res = findDeckForTopicId(topicId);
	    	if(res.length!=0) {
	    		return res.cards;
	    	} else {
	    		return [];
	    	}
	    },
	    getTitleForTopic: function(topicId) {
	    	var res = findDeckForTopicId(topicId);
	    	if(res.length!=0) {
	    		return res.topic;
	    	} else {
	    		return "";
	    	}
	    },
	    
	    checkIfCardBelongsToAnyDeck: function(card) {
	    	for(i=0;i<decks.length;i++){
	    		if(decks[i].topic && (decks[i].topic.toLowerCase() == card.category.toLowerCase())) {
	    			return decks[i];		// return the deck
	    		}
	    	}
	    	return null;
	    },
	    updateDeckInDecks : function(deck) {  // Actually updating only the cards array.
	    	var found = false;
	    	for(i=0;i<decks.length;i++){
	    		if(decks[i].id == deck.id) { //found, update the cards
	    			if(deck.cards && deck.cards.length>0) {
	    				decks[i].cards = deck.cards;
		    			
	    			} else {
	    				decks.splice(decks.indexOf(deck), 1); // If no cards in the deck, remove the deck
	    			}
	    			found = true;
	    			break;
	    		
	    		}
	    	}
	    	if(!found) {
	    		decks.push(deck);
	    	}
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
