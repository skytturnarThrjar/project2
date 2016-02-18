
//ng Annotate svo að það se hægt að minifya koðann
angular.module("chatApp").controller("LoginController", ["$scope", "socket", "$location", "$rootScope", "$routeParams",
function ($scope, socket, $location, $rootScope, $routeParams) {
  //hægt að gera þetta svona en ekki mælt með því (eins og placeholder held ég?)
  /*$scope.login = "vala";
  $scope.pass = "flottlykilorð";*/

  $scope.username = "";
  $scope.errorMessage = "";
  $scope.login = function(){
    socket.emit('adduser', $scope.username, function (available) {
      if (available) {
        $location.path('/roomlist/' + $scope.username);
      } else {
        $scope.errorMessage = 'Nick is taken!';
      }
    });
  };
}]);
