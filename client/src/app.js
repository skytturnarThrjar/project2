var chatApp = angular.module("chatApp", ['ngRoute']);
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
	.otherwise({redirectTo: "/login" });
}]);

chatApp.run(function($rootScope, $location) {
  $rootScope.$on( "$routeChangeStart", function(event, next, current) {
		if ($rootScope.loggedUser === undefined) {
      if (next.templateUrl !== 'src/login/login.html') {
				$location.path('/login');
			}
		}
  });
});
