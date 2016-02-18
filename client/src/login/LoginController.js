angular.module("chatApp").controller("LoginController", ["$scope", "socket", "$location", "$rootScope", "$routeParams",
function ($scope, socket, $location, $rootScope, $routeParams) {

  $scope.username = "";
  $scope.errorMessage = "";

  $scope.login = function(){
    socket.emit('adduser', $scope.username, function (available) {
      if (available) {
        $rootScope.loggedUser = $scope.username;
        $location.path('/roomlist/' + $scope.username);
      } else {
        $scope.errorMessage = 'Nick is taken!';
      }
    });
  };

  // BUTTONS ======================

// define some random object and button values
$scope.bigData = {};

$scope.bigData.breakfast = false;
$scope.bigData.lunch = false;
$scope.bigData.dinner = false;

// COLLAPSE =====================

}]);
