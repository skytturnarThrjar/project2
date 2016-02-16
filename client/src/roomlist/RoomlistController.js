// angular.module("chatApp").controller("RoomlistController", ["$scope".function($scope) {
angular.module('chatApp').controller('RoomlistController', ["$scope", "socket", function ($scope, socket) {
  socket.on("roomlist", function(rooms) {
    $scope.roomlist = rooms;
  });
  socket.emit("rooms");
}]);
