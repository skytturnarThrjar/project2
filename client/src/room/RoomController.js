
/*
function RoomController($scope, $routeParams) {
  //þarf að vera sama nafn og i app.js
  var id = $routeParams.id;
}*/

angular.module('chatApp').controller('RoomController', ["$scope", function ($scope, $routeParams) {
  $scope.blabla = $routeParams.roomID;
}]);
