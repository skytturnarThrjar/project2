"use strict";

angular.module("chatApp", ["ngRoute"])
.config(["$routeProvider",function ($routeProvider) {
	$routeProvider.when("/login", {
		templateUrl: "src/login/login.html",
		controller: "LoginController"
	}).otherwise({redirectTo: "/login" });
}]);