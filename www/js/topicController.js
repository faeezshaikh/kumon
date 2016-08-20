angular.module('starter.controllers')


.controller('TopicCtrl',function($scope,$rootScope,$timeout,$ionicScrollDelegate,$stateParams,CardService,$window,$state,$location,$ionicModal) {
	
	console.log('Id = ',$stateParams.topicId);
	
	$scope.cards = CardService.getDeckForTopic($stateParams.topicId);
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
		$scope.cards.push(card);
		$scope.card = {};
	}
	//////// Add new Flashcard //////
	
	
	//////// Delete Flashcard ////////
	$scope.remove = function(card) {
		$scope.cards.splice($scope.cards.indexOf(card), 1);
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

})
;
