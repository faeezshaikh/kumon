angular.module('starter.controllers')
	.controller('TestCtrl', function ($scope, $rootScope, $timeout, $ionicScrollDelegate, $stateParams, CardService, $window, $state, $location, $ionicModal) {

		// console.log('Id = ', $stateParams.topicId);
		// $scope.testTopic = $stateParams.topicId;
		$scope.testTopics =
			[	{"id":1, "topic": "Addition" },
				{"id":2, "topic": "Subtraction" },
				{"id":3, "topic": "Multiplication" },
				{"id":4, "topic": "Division" }];


		////// Quiz Code ////////
		var begin = 0;
		$scope.showNext = true;
		$scope.dynamic = 0;
		$scope.questions = [{
			"id": 0,
			"q": "8 + 8",
			"op": [{
				"val": "16",
				"ans": true
			}, {
					"val": "15",
					"ans": false
				}, {
					"val": "14",
					"ans": false
				}, {
					"val": "17",
					"ans": false
				}]
		}, {
				"id": 1,
				"q": "4 + 9",
				"op": [{
					"val": "16",
					"ans": false
				}, {
						"val": "14",
						"ans": false
					}, {
						"val": "13",
						"ans": true
					}, {
						"val": "11",
						"ans": false
					}]
			}, {
				"id": 2,
				"q": "8 + 9",
				"op": [{
					"val": "13",
					"ans": false
				}, {
						"val": "14",
						"ans": false
					}, {
						"val": "17",
						"ans": true
					}, {
						"val": "19",
						"ans": false
					}]
			}, {
				"id": 3,
				"q": "6 + 10",
				"op": [{
					"val": "11",
					"ans": false
				}, {
						"val": "15",
						"ans": false
					}, {
						"val": "16",
						"ans": true
					}, {
						"val": "19",
						"ans": false
					}]
			}]
		$scope.filteredQuestions = $scope.questions.slice(begin, begin + 1);

		$scope.goTo = function () {
			resetButtons();
			begin = begin + 1;
			$scope.dynamic = begin;

			// console.log('index',index);

			if (begin == $scope.questions.length) {
				$timeout(function () {
					$scope.resultMode = true;
				}, 500);

			}
			$scope.filteredQuestions = $scope.questions.slice(begin, begin + 1);

		}
		//////// Quiz Code ends ///////	

		$scope.finished = function () {
			// Finish callback
			console.log('Finito!');

    };

		///// Progress bar code /////

		$scope.max = $scope.questions.length;


		function resetButtons() {
			$scope.buttonType0 = $scope.buttonType1 = $scope.buttonType2 = $scope.buttonType3 = "button button-stable";
			$scope.result = "";
		}
		resetButtons();
		$scope.change = function (val, idx) {
			if (val) {
				if (idx == 0) $scope.buttonType0 = "button button-balanced";
				if (idx == 1) $scope.buttonType1 = "button button-balanced";
				if (idx == 2) $scope.buttonType2 = "button button-balanced";
				if (idx == 3) $scope.buttonType3 = "button button-balanced";
				$timeout(function () {
					$scope.goTo()
				}, 500);
				$scope.result = "Correct!";
			} else {
				if (idx == 0) $scope.buttonType0 = "button button-assertive";
				if (idx == 1) $scope.buttonType1 = "button button-assertive";
				if (idx == 2) $scope.buttonType2 = "button button-assertive";
				if (idx == 3) $scope.buttonType3 = "button button-assertive";
				$scope.result = "Wrong!";
			}
		}

	})
	;
