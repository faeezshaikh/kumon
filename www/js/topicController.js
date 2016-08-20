angular.module('starter.controllers')


.controller('TopicCtrl',function($scope,$rootScope,$timeout,$ionicScrollDelegate,$stateParams,CardService,$window,$state,$location,$ionicModal) {
	
	console.log('Id = ',$stateParams.topicId);
	
	$scope.cards = CardService.getCardsForTopic($stateParams.topicId);
	$scope.title = CardService.getTitleForTopic($stateParams.topicId);
	$scope.card = {'category':'','front':'','back':''};
	
	$scope.manage = function() {
		console.log('managing..',$stateParams.topicId);
		$location.path ("tab/topics/" + $stateParams.topicId + "/manage");
		console.log(' State name = ',$window.location.href);
	}
	
	$scope.remove = function(card) {
		$scope.cards.splice($scope.cards.indexOf(card), 1);
	}
	
	
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
		$scope.cards.push(card);
		$scope.card = {};
	}
	
	$scope.spin = function() {
		  console.log('spin');
		  $('.cardx.current').toggleClass('flip');
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
;
