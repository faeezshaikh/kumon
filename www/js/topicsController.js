angular.module('starter.controllers')

.controller('TopicsCtrl', function($scope,$rootScope,$timeout,$ionicScrollDelegate) {

	
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



})

;
