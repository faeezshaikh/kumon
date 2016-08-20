angular.module('starter.controllers')

.controller('TopicsCtrl', function($scope,$rootScope,$timeout,$ionicScrollDelegate,CardService) {

	
	// Kumon color code : #7DCDF4;
	$scope.title = "Home";
	$scope.titleColor = "myColor";
	
	$scope.getTopics = function() {
		return CardService.getTopics();

	};
	
})

;
