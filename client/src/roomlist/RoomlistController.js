// angular.module("chatApp").controller("RoomlistController", ["$scope".function($scope) {
angular.module('chatApp').controller('RoomlistController', ["$scope", "socket", "$location", function ($scope, socket, $location) {

  socket.on("roomlist", function(rooms) {
    $scope.roomlist = rooms;
  });
  socket.emit("rooms");

  $scope.errorMessage = '';
  $scope.roomName = '';

  $scope.newRoom = function(){
    socket.emit('joinroom', {'room': $scope.roomName});
  };

  $scope.moveToRoom = function(name){
    socket.emit('joinroom', {'room': name}, function (available) {
      if (available) {
        $location.path('/room/' + name);
      }
      else {
        $scope.errorMessage = 'Cannot join room';
      }
    });
  };
}]);
