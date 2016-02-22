angular.module('chatApp').controller('RoomlistController', ["$scope", "socket", "$location", "$routeParams", function($scope, socket, $location, $routeParams) {
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

    $scope.newRoom = function() {
      socket.emit('joinroom', {
        'room': $scope.roomName
      });
      $scope.moveToRoom($scope.roomName);
    };

    // MOVE TO ROOM

    $scope.moveToRoom = function(name) {
      socket.emit('joinroom', {
        'room': name
      }, function(available) {
        if (available) {
          $location.path('/room/' + $scope.currentUser + '/' + name);
        } else {
          $scope.errorMessage = 'Cannot join room';
        }
      });
    };

    //MOVE TO PRIVATE ROOM
  $scope.moveToPrivateRoom = function(curr,friendName) {

    socket.emit('roomExists', {
      'curr': $scope.currentUser,
      'friend': friendName
    });
    var roomName = $scope.currentUser + '-' + friendName;

    socket.on('getRoom', function(room) {
      console.log(curr);
      console.log(friendName);
      roomArray = room.split('-');
      if(curr == roomArray[0] || curr == roomArray[1]) {
        if (room === "NotExist") {
          $location.path('/private/' + $scope.currentUser + '/' + friendName + '/' + roomName);
          socket.emit('getPriHistory', {
            'currentUser': $scope.currentUser,
            'room': roomName,
            'nick': friendName
          });
        } else {
          console.log("room" + room);
          $location.path('/private/' + $scope.currentUser + '/' + friendName + '/' + room);
          socket.emit('getPriHistory', {
            'currentUser': $scope.currentUser,
            'room': room,
            'nick': friendName
          });
        }
      }
    });
  };

//CLEAR INPUT FIELD
$scope.clearfunction = function() {
$scope.message = '';
};
}]);
