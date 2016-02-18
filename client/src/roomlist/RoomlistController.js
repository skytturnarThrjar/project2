// angular.module("chatApp").controller("RoomlistController", ["$scope".function($scope) {
angular.module('chatApp').controller('RoomlistController', ["$scope", "socket", "$location", "$routeParams", function ($scope, socket, $location, $routeParams) {

  socket.on("roomlist", function(rooms) {
    $scope.roomlist = rooms;
  });
  socket.emit('rooms');

  $scope.errorMessage = '';
  $scope.roomName = '';
  $scope.currentUser = $routeParams.user;

  $scope.newRoom = function(){
    socket.emit('joinroom', {'room': $scope.roomName});
  };

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

  socket.on('userlist', function(users) {
    // console.log(users);
    $scope.activeUsers = users;
  });
  socket.emit('users');


  $scope.moveToPrivateRoom = function(item){
        $location.path('/private/' + $scope.currentUser + '/' + item);
  };
//
      //  console.log("her!");

  socket.on('privateRoomList',function(list) {
    $scope.privateRoomList = list;
    console.log($scope.privateRoomList);
  });
  socket.emit('privateRoom',$scope.currentUser);


  // socket.on('privateRooms', function(users) {
  //   // console.log(users);
  //   $scope.privateRoomList = users;
  //   console.log($scope.privateRoomList);
  //
  // });
  // socket.emit('users');



}]);
