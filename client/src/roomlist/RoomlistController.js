// angular.module("chatApp").controller("RoomlistController", ["$scope".function($scope) {
  angular.module('chatApp').controller('RoomlistController', ["$scope", function ($scope) {
  $scope.roomlist = [ {
    name: "spjall 1",
    id: 1
  }, {
    name: "spjall 2",
    id: 2
  }
  ];
}]);
