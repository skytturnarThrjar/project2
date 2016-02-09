"use strict";

angular.module("chatApp", ["ui.bootstrap","ngRoute"])
.config(function ($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "src/login/login.html",
		controller: "LoginController"
	}).when("/room", {
		templateUrl: "src/roomlist/Roomlist.html",
		controller: "RoomlistController"
	});
});