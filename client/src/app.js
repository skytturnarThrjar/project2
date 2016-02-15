"use strict";

angular.module("chatApp", ["ngRoute"])
.config(["$routeProvider",function ($routeProvider) {
	$routeProvider.when("/login", {
		templateUrl: "src/login/login.html",
		controller: "LoginController"
	})
	.when("/roomlist", {
		templateUrl: "src/roomlist/Roomlist.html",
		controller: "RoomlistController"
	})
	.otherwise({redirectTo: "/login" });
}]);
