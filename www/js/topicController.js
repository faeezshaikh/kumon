angular.module('starter.controllers')


.controller('TopicCtrl',function($scope,$rootScope,$timeout,$ionicScrollDelegate,$stateParams,CardService,$window,$state,$location,$ionicModal) {
	
	console.log('Id = ',$stateParams.topicId);
	
	$scope.cards = CardService.getCardsForTopic($stateParams.topicId);
	$scope.title = CardService.getTitleForTopic($stateParams.topicId);
	$scope.card = {'category':'','front':'','back':''};
	
	
	///////// Open the Manage page button //////////
	$scope.manage = function() {
		console.log('managing..',$stateParams.topicId);
		$location.path ("tab/topics/" + $stateParams.topicId + "/manage");
		console.log(' State name = ',$window.location.href);
	}
	///////// Open the Manage page button //////////	
	
	
	//////// Add new Flashcard //////
	 $ionicModal.fromTemplateUrl('templates/composeFlashcard.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		  }).then(function(modal) {
		    $scope.composeIdeaModal = modal;
		});
	 
	$scope.openComposer = function() {
		$scope.composeIdeaModal.show();
	}
	$scope.closeComposer = function(){
		$scope.composeIdeaModal.hide();
	}
	
	$scope.submit = function(card) {
//		$scope.cards.push(card);
		$scope.card = {};
		
		// 1. Check if card belongs to existing deck.
		var deck = CardService.checkIfCardBelongsToAnyDeck(card);
		if(deck==null) {
			// If no, then create a new deck. Add this card to cards array of new deck. Save. Done
			var newDeck = {};
			newDeck.id = new Date().getTime();
			newDeck.topic = card.category;
			newDeck.url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADMCAMAAAAI/LzAAAABI1BMVEX///+kl6SXipfhWWnwTVHr6+v/maHxe4eVf5WajZqilaJpWWnkXGtxYXH/nKSViJXvR0vuVVz1Z2zmWWlzY3P0XmOgl6Ty8PL39vd2Znaqnqp8bXzyfYjSzNLucn/r8vLFvcWQf5WHeYfd2d3p5um1q7W3rbfTztNtXG3wQETr5ueRi5jKw8ppYXGDdYPg3eDUWmpjUmN9YHDymKGbhJb+7O2aX2/0xcjHkZyPX2/wOT30pq3kmKHkaXfs3N384eOzjp2fi5++XW3bl6Kof5K1XW2Lc4vgSFvee4nRfoyqXW3wbnHttLrwqqyFYHCvl6S4gI/6z9Peub+xbXzoo6vqkJnwhY/pz9PLW2uycYWuf5LzhYe8jZnVd4X/zM/Ffo7FmKNFWrzIAAAPQ0lEQVR4nO2dCVPbSBbHkYxDLKOIxF4kBMYCybIBgyCQYRJyMklIJs7BTgaymSPz/T/FduuwJfWhvgRsLf+aqqkKNWP/8t6/3+vXLTE3d6tb3epWt/r/kWMHfm/seWE4iBV63njoB/Z1fy8+OXbU8waGbuHVMgbeMLCd6/6a1YIcrgG/s05U/FNIFN3gKDlBL3RbVI4Ckm64Xi+47m+NVeS5LZ0RJAfUcr0bxuNEIXNEUCDL8IKb4iAnGruCILMADW5Evjl+aMihpDya5183ytjV5UlSnJY7vMZsa45bCoKS59GG17RaN8eaSpLrxHFkXU/Qzo47fHR+PPl4AjQ5Pn9xBZk31FR5pYiiH315f7G2tpBpbe3i8PhRrSjRoJao6C9/vFtYXyhpfX398Lw2nsBr1YCy0/ryvswx5Vm4qCk8vnrfw/z68m6NxBLr8Fg9ih3WYBaIQiVJcFQHxzfqQPn+DnEKLtnWlAbHHtcRlpdEryCaqAtOMFBOAurKjwtmFoWp5tewiO0c/cWBAlLtQgmNM66jtHzhQolpXsiz2J56kh2d3S0z/S5NY9dhlyMRFkAjmWnNOlbk1xVlkqhDqeYzqqHo73x5JoaysN55KkFTS6X8wVInsSyLjUXx6hnVwKIf/SUGswZYGp0FUdtEdbT7R3c3Xr8XsMzaegOqcyjI4qpHASx3725sHP1gaC+LSlgAjdD6HLma1qqDJcH5AsLDESCYY+KhCVxDU06TssQ8d7//tcZKszZlaTSe8YfGjlkU0+RY4vCwmmdtvZHTV26WMGFRSlNk4cApsHTecS5ojqdNpYjG2iijsOLkc0wkz3qappjGaoXuq7tv3+Jw6HuBMkujwVc4fUNTTGMZcNbvRB4gQnFoc4CiX+I84zJN09U0tTQJS/I/H4YIz8Zd8qYTYQGLM0eDNjO/KhpruXAG0/TDo1K+Aesw5hiA4dlzjhEWSRpLK58nOYFXwgFlB7MQoDnW4OvPfAyLFI3lYsf7Q62ca0hwsCw8MFm1VEazczT5+/zFI/QLOEO37JxScLAsPDAenkWYxmo9vQN0eDJBZ+B271Uh2TZeXxTigvqFD8YnoIjSpCyx7p0gPLZ3922B5l1FjkEY1lFAk5BkojTW58M7BSE8gVtMtfdVLOx1BreSSdDslFlgfP4unYmNi3XnPc0vMcyEjSUol8uiDE4a6/NThAXiTIrdVeQWnPOO4heoxXM2mAE1MLw0O3gWqI+FZHO8HA1cBcg5BrTO1mgOW3QWvkzbeYnmWBabO/fXCl+pl/fNd0qOQf8zsTj0JOOkwfllyvJgaWv+JB+dyMjRvCfnGID5uc8C06tGYaehxuXB0vz80lLhCCnQ3s4SbZ8C03g4ZmCxqxzDQ1PJArQ0fyefF7MCuvGfDjkwp7s6w+0H+rLMR7Pz8h6Z5V8JC9CTBznnOLNmbWOfSNP5tHtQHRqbxTGMNFSWB1OW+fmt+7mi0TSqQ9P5ZpojoxKmxxqYahqWHEu1NH9vVkL92SLwjUTz0665YlXd6WJaythodv5kZoHB+WO2qo3fVoSmc2qa5qblKgwMnWbnZxJKwS8zmg8z42S9wAYpNI9hYHR9SA8M41JWTWP9SWFB4lKiCbI+beM3HEznDQwM+IyQOgagtP6cNFw5ltFMv9t4Wmtwcdl/CAIDP8SgXex0iHsyThpqjhFYoG8yGjtbnzcwedYB7h9tws+1aKtzRbvMTMPrlynNdLafrWgb3xGYzptd09yLP9XSKIWT0/5EGqG4zMMV+u8sR6abtUaJpvPtoRm7P6Yhr84OOioTodn5mbFWYmg+ZAu0ny1op+XQgJUMuj+BGZCzTIylRGOR43KnggXQTDfDr7JSgzHM3uzDiHkmYH+UxvpFzC+x7i+eZetzL6uchQYNGma0mvs04hIgYn+ERtQvCUvjLNt02VmteZODiUt/15p9GrELEM4ybbaTpsaFgQUo29uHb5GWJjb/1DCxWoRSI55l09goYJnOw3xkj9bZ/7RbYtH1HpaFu5VBaCxdzi/pd05DMy2cWd3swMpv7hVZCC2NUMUs0sjHBX7n7GZMmIYmNU0cl7z5U9Ng82woybKsKWFpdJ6leTYs7AM6+48xLMA0uLop0pcVWYjjMS6WRuPsJM2zV+k+IBcX9OYLdnFmHWQIsTD7JQlN+pWybQ0wTewXTFxgE4AxTSRlmWXy2JIzLjA0aeFMJ5zANGBNJrCAfQCmCZCyjLoci2E+Jl/Jn1aaUzKLbkUojIxlFOZYnGcXSeY4KczrNya6JtNMI9oxxyzUHONmaTQW0zxLOxpYKs1N0p4W0zlzzMv4WHhzLA7NJL8CwBamu0lAAWqh/r9BLI1OujjH7RlgGa1QWDDbgKFoli2Tx/xiOdaYXViA2wDIsmrRJnToCiDq/zpYQKVJTBMBllEVi24hvaag/5fJI1jRHIuVNJvBEfRLBYtueWUYMf/T4yLOkq4A9tsRtoUpwZSXM6cGFsEci2GSzvlzG3i/Ii6Y3aYtkmX0HJNgATs0AON8PmBh0a3l0nIWVB/Koiz/1JNjEGbBBixtOCBjONMqT2kj/sgs/0Mcj8myxHuaz6PZsI+uVmlt5i8zy/8QUSRzDMJ0HjHmWAxT2p9xD2bpcZFkaXQW/2wXZ0pUmNI5DfOx7JSlNr/E+nUE+zHW2walqsnZANTpl0Z6mkTrLUsay8DU6hfA8usue45Jw9TL0oAHMOw5hm7PeFqzq8kxjrtG5eaMA2aZcmShggXOxssz2Lpg6CzyfuHNMSmYuuNC3e8rhVle/qVev5w+5GcRhAEs9cYFzvq4WZDVjGlppo3Glfjl1ETPX1gkAFPBoiAupkhcdKSdYejN6md5OL2tIAdT3TXX7hfcuRibyl0z/gmTq/TLt65gjqH7maqdJm00rizHRkI5hu40K2YAtbNgzytZVZ4B0KczN5tFL09n5qgslNG4Er+Iex8KvaVBmWhWsFx3XDAHNOR+JhlbHn6cHB8fT07u1cCCPxNnh/HKMMSquawd3js5f77dTPT8WDVL4zH+TJwdBrlESxycGf9+0ez3m1P1n9/Lscj7pSGXYxAGuaMRkFi0KEcS05zfqLgAGOQiAOlM0xgEzZK2TxSywIt9bENYotBnAkinzYZXZmk2M9vIz/ogiykXF+w9TcIKYIxRmNg1Svzyk3SO4U4ByZfNfQzMobocYzu0oMJgbmgQrpu5EQqz/VHJPFkNC/buDP5WkxGiLM3mR2V+kfS+TroKiN054yzTbE4UzGAbv+52FbAQLgPjrzUNbZSlP1HgF0Us+JuAWNOAkokJTP9kSz4uXcDSUvBeDreJg8E9BWwMcFnW/0gPTDXLYsoi/5YRK8Sy4CoNrmRWwlSzdOIcSza3sjSER7UwN85bPYxlKmAYWN5AFj37DCkWA59luA2agbMMHYaB5dTsml199jcmwUJ+IhDJM8PFsVBhGLz/ppuLiyQNupeZ5hkSmBCXZWBpJsKw5JjZ7a5YxWwWpyE+D4h0zsaYACOXY91ukUWchvJkE7LdNDBdJoQ5lmB5CJKszML9JospDOWJ4FLdNHBdJoS5vK80LsKxsVzaU6fF/gzfZcIxALY1Y4wLlkWMhvqcZukOLb5kAm1/wMAwsHzr4nJMnIb6BG25pRkSYPp/oM0ZCwv0yyaBRYCG1MpkKhxtECwDV4AnCEun0YESZ+GnKU//EeVebIQZzEx1P59nS0tL9xefLbwDWm+QeGKWLo2Fl4a2LifKrc5Ey8AeYGspA9namv9wOLm8fL4N9Pz4afn53ZRlvyou3DSVb2rI754JJTPRydKTra2tJ0/mH/x+fLndzIae4F+Xz85wLJ92q1m4aCpf1DBX2HDiS2Yam8uvFxeHk/Ptfr888dy+QJ8U//bJrMoxXhrcVIYYGsMlWyaOQSLMT54vlJ8UZ4wLDw328SxiaAhdJoP6kzNhFmYa/N6/LCdd0AxPFKbZfFZ4uHr/8W53tMfIwkjDFpjpyXPLF4bpfz0rx4WdhY2G9EwzorhDMzSqZegwl51iXMw9rmuT1TToaRlJcfOMH8ww6vliRgMPYECOqXoDTMZisL+rFe6fKSWTQZlpEpZVPpRqGvJuGRXcchqkLpNJ651cjvGzVNBUvD2npAhUGVrJZISJ42KuKnpnyowFeYstXV6L0mVWaztOs86iOAttJ407XqImmitjmX68AHQWf4PDPtHHDIk0LE1ZUUFPBuYyZvlJPC6x8DRWi/+3B0qwxP1MyiLwxFQFDVsfU5R4LwNgfj+Db7uZDseV0nj8LI5MZECZSfwiyYKhIbzDuj6Y/uWZIhaExsIdx1ZKKsu+dn7rmuaqXv1deWlEDCPn/+0LyKIiLggNZ4VJtV39nYmBOf9hAhglcSnSsPfKBZEmZkyB+TyCBzCy7+RBaQRZ5pYJY2a6bLsZ9cLWCrysoAxlSsO6uUS0N+LdNNuOEwzD5c2V0cgcEYbjUjRCizJU0zxohxyrs23bkWdAEKDu6qYi7+dpSAf+1Rq32wcHbNMZkFpBNHY3RwftkdldWd20DE2dXabSB8K/z3nQhjTVmQZI/PGgtWe2QXJBkJbcC5+IMsRZHP0A0lT4xrGD3qCV5Ja5srdZF4gWz/BEWeaivTYUxTcwJKGx14UcJjCJXh+IJMvc0GwnNATfBJGnbY7atZokz+LJ/JpG76Cd0rRLmWbbATCJvjqq2yR5jWVYHDeDKfjGTkwS5xY0yZWAaIY2lPr1mc3NKQzMtMw3fthaNWOTrKxayisJicVlOLmgKTLb7TxNsnbN+XupSep1e1Ey1o/VO8izHGz6ThLowL0ik2QytLEsy1xmGQDStUK/Oc1ZR/j1VGIsrtBWrChoGfCPueki3gsk3xzKJekUA7IPDtqrljvGNnbOmPZbgxTKcDmG42QN9waeT/5LCSReuMfB4vHNk0lymvSF3elpdeMYaILXJturFcdwpWo+t6KwNhzDVZRh7HJA01wHjqF5/pWGJcUZDpTjGMbgOlBi+QOlyWZooWQjJonjuYrCYwCvXCvKHPydmGMVOCC/eldte6xsuBbI8ID/OLw2q6Cye6ErZh8A4t4kkkTB0BtonAECPgGdk+hwr1Y5QTQOXdaMgyHxepGCxrg2OXYKRGZKfuiGvcC+admFlR0Mx+HAdd3ct4/ZwB+BxBr7wf8ERk6OHQS+P+z1xol6w6EfBc2bnFe3utWtbnUj9F+lOc2X/ebgCwAAAABJRU5ErkJggg==";
			newDeck.cards = [];
				newDeck.cards.push(card);
			CardService.updateDeckInDecks(newDeck);
			
		} else {
			// If yes, update the cards array of that deck with this card. Save. Done
			deck.cards.push(card);
			CardService.updateDeckInDecks(deck);
		}
		
		$scope.cards = CardService.getCardsForTopic($stateParams.topicId);
		// 1. Check if card belongs to existing deck.
		// 2. If yes, update the cards array of that deck with this card. Save. Done
		// 3. If no, then create a new deck. Add this card to cards array of new deck. Save. Done
		// 4. Save = Update the deck (or the new deck) to the decks array.
	}
	//////// Add new Flashcard //////
	
	
	//////// Delete Flashcard ////////
	$scope.remove = function(card) {
		// 1. Check if card belongs to existing deck.
		var deck = CardService.checkIfCardBelongsToAnyDeck(card);
		if(deck==null) {
			console.log('Card was not found in the master deck');
		} else {
			// delete card from master deck.
			deck.cards.splice(deck.cards.indexOf(card), 1);
			CardService.updateDeckInDecks(deck);
		}
//		$scope.cards.splice($scope.cards.indexOf(card), 1);
	}
	////////Delete Flashcard ////////
	
	
	/////// Flashcard code /////////
	function init(){
		  $timeout(myCycle,10);
	  }
	  init();
	$scope.spin = function() {
		  console.log('spin');
		  $('.cardx.current').toggleClass('flip');
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
	  
		  
	  function onBefore(){
	    $(this).parent().find('.current').removeClass('current');
	  }
	  function onAfter(){
	    $(this).addClass('current');
	  }
	  
	/////// Flashcard code /////////

	  
	  $scope.changeColor = function(color) {
		  if(color=='white') {
			  $('.cardx p').css('background-color','');
			  $('.cardx ').css('color','');
		  } else {
			  $('.cardx p').css('background-color',color);
			  $('.cardx ').css('color','black');
		  }
	  }
})
;
