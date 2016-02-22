angular.module('chatApp').controller('RoomlistController', ["$scope", "socket", "$location", "$routeParams",
function($scope, socket, $location, $routeParams) {
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

  socket.on('privateRoomList', function(list) {
    $scope.privateRoomList = list;
  });
  socket.emit('privateRoom', $scope.currentUser);

  //CREATE NEW ROOM

  $scope.newRoom = function() {
    socket.emit('joinroom', {'room': $scope.roomName});
    $scope.moveToRoom($scope.roomName);
  };

  //LOG OUT BUTTON

  $scope.logout = function() {
    socket.emit('disconnectPlease');
    $location.path('/login');
  };


  //MOVE TO ROOM

  $scope.moveToRoom = function(name) {
    socket.emit('joinroom', {'room': name}, function(available) {
      if(available) {
        $location.path('/room/' + $scope.currentUser + '/' + name);
      }
      else {
        $scope.errorMessage = 'Cannot join room';
      }
    });
  };

  //MOVE TO PRIVATE ROOM

  $scope.moveToPrivateRoom = function(curr, item) {
    if(curr === $scope.currentUser) {
      socket.emit('roomExists', {'curr': $scope.currentUser, 'other': item});
      socket.on('getRoom', function(room) {
        roomArray = room.split('-');
        if(curr == roomArray[0] || curr == roomArray[1]) {
          if(room === "nothing") {
            $location.path('/private/' + $scope.currentUser + '/' + $scope.currentUser + '-' + item);
          }
          else {
            $location.path('/private/' + $scope.currentUser + '/' + room);
            //kalla á history
            socket.emit('getPriHistory', {'currentUser': $scope.currentUser, 'room': room, 'nick': item});
          }
        }
      });
    }
  };

  //CLEAR INPUT FIELD

  $scope.clearfunction = function() {
    $scope.message = '';
  };

  //CHECK IF THERE IS A ROOMNAME

  $scope.messageNotEmpty = function() {
    if($scope.roomName === '' || $scope.roomName === null) {
      return false;
    }
    else {
      return true;
    }
  };
}]);
