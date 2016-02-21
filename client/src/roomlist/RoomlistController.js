// angular.module("chatApp").controller("RoomlistController", ["$scope".function($scope) {
angular.module('chatApp').controller('RoomlistController', ["$scope", "socket", "$location", "$routeParams", function ($scope, socket, $location, $routeParams) {
  $scope.errorMessage = '';
  $scope.roomName = '';
  $scope.currentUser = $routeParams.user;

  socket.on("roomlist", function(rooms) {
    $scope.roomlist = rooms;
  });
  socket.emit('rooms');

  socket.on('userlist', function(users) {
    $scope.activeUsers = users;
  });
  socket.emit('users');

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

  //MOVE TO PRIVATE ROOM
  $scope.moveToPrivateRoom = function(curr, item){
    var array = item.split('/');
      if(curr === $scope.currentUser) {
        socket.emit('roomExists', {'curr': $scope.currentUser, 'other': array[0]});
        socket.on('getRoom', function(room){
          roomArray = room.split('-');
          if(curr == roomArray[0] || curr == roomArray[1]) {
            if(room === "nothing") {
              $location.path('/private/' + $scope.currentUser + '/' + $scope.currentUser + '-' + item) ;
            }
            else {
              $location.path('/private/' + $scope.currentUser + '/' + room + '/0') ;
              //kalla á history
              socket.emit('getPriHistory', {'currentUser': $scope.currentUser, 'room': room, 'nick' : array[0]});
              console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

            }
          }
        });
      }
   };

  $scope.moveToExistingPrivateRoom = function(curr, item){
    if(curr === $scope.currentUser) {
      $location.path('/private/' + $scope.currentUser + '/' +  item + '/0') ;
    }
  };

// hér þurfum við að vera með eh check hvort það hafa eh bæst við held ég
  socket.on('privateRoomList',function(list) {
    $scope.privateRoomList = list;
    console.log($scope.privateRoomList);
  });///er /etta ad gera eh ??? elin
  socket.emit('privateRoom',$scope.currentUser);
}]);
