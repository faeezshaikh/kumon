angular.module('starter.services', [])


.factory('CardService',function(){

	var map ={1:{"topic" : "Vocabulary", "cards" : [{"front":"2+3","back":"5"},{"front":"whats your name?","back":"Maryam Shaikh"}]},
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
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
