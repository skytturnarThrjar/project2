var chatApp = angular.module('chatApp', ['ngRoute','ui.bootstrap']);
chatApp.config(["$routeProvider",function ($routeProvider) {
	$routeProvider.when("/login", {
		templateUrl: "src/login/login.html",
		controller: "LoginController"
	})
	.when("/roomlist/:user", {
		templateUrl: "src/roomlist/Roomlist.html",
		controller: "RoomlistController"
	})
	.when("/room/:user/:roomID", {
		templateUrl: "/src/room/Room.html",
		controller: "RoomController"
	})
	.when("/private/:user/:ChatFriend", {
		templateUrl: "/src/privatemessage/PrivateMessage.html",
		controller: "PrivateMessageController"
	})
	.otherwise({redirectTo: "/login" });
}]);
