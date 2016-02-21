// angular.module("chatApp").controller("RoomlistController", ["$scope".function($scope) {
angular.module('chatApp').controller('RoomlistController', ["$scope", "socket", "$location", "$routeParams", function ($scope, socket, $location, $routeParams) {
  $scope.errorMessage = '';
  $scope.roomName = '';
  $scope.currentUser = $routeParams.user;

  // GET ROOMLIST

  socket.on("roomlist", function(rooms) {
    $scope.roomlist = rooms;
  });
  socket.emit('rooms');


  // GET USER LIST

  socket.on('userlist', function(users) {
    $scope.activeUsers = users;
  });
  socket.emit('users');

  //CREATE NEW ROOM

  $scope.newRoom = function(){
    socket.emit('joinroom', {'room': $scope.roomName});
  };


  // MOVE TO ROOM

  $scope.moveToRoom = function(name){
    socket.emit('joinroom', {'room': name}, function (available) {
      if (available) {
        $location.path('/room/' + $scope.currentUser + '/' + name);
      }
      else {
        $scope.errorMessage = 'Cannot join room';
      }
    });
  };

  //MOVE TO PRIVATE ROOM

  $scope.moveToPrivateRoom = function(friendName){

    socket.emit('roomExists', {'curr': $scope.currentUser, 'friend':friendName});

    socket.on('getRoom', function(room){
        if(room === "NotExist") {
          var  roomName =  $scope.currentUser + '-' + friendName;
          socket.emit('joinPrivateRoom', {'room': room}, function (available) {
            if (available) {
              $location.path('/private/' + $scope.currentUser + '/' + friendName + '/' +roomName) ;
            }
            else {
              $scope.errorMessage = 'Cannot join room';
            }
          });
        }
        else {
          socket.emit('joinPrivateRoom', {'room': room}, function (available) {
            if (available) {
              $location.path('/private/' + $scope.currentUser + '/' + friendName + '/' + room) ;
            }
            else {
              $scope.errorMessage = 'Cannot join room';
            }
          });
        }
    });
  };
}]);
