"use strict";

var chatApp = angular.module("chatApp", ["ngRoute"]);
chatApp.config(["$routeProvider",function ($routeProvider) {
	$routeProvider.when("/login", {
		templateUrl: "src/login/login.html",
		controller: "LoginController"
	})
	.when("/roomlist", {
		templateUrl: "src/roomlist/Roomlist.html",
		controller: "RoomlistController"
	})
	.when("/room/:roomID", {
		templateUrl: "/src/room/Room.html",
		controller: "RoomController"
	})
	.otherwise({redirectTo: "/login" });
}]);
