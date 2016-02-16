angular.module('chatApp').controller('RoomController', ["$scope","socket","$routeParams","$location",
function ($scope, socket, $routeParams,$location) {
$scope.message = "";
console.log($routeParams.user);
$scope.roomName = $routeParams.roomID;
$scope.currentUser = $routeParams.user;
$scope.ops = [];
$scope.currentUsers = [];

socket.on('updateusers', function(roomName, users, ops) {
  if(roomName == $scope.roomName) {
    $scope.ops = ops;
    $scope.currentUsers = users;
  }
});

$scope.checkIfOp = function(username) {
  if(ops.indexOf(username) == -1) {
    return false;
  }
  else {
    return true;
  }
};

socket.emit('joinroom', {'room': $scope.roomName}, function (available) {
  //baned passa edge case
});

$scope.sendmsg = function() {
     socket.emit('sendmsg',{roomName: $scope.roomName, msg:$scope.message} );
    //  console.log("her!");
};

socket.on('updatechat', function(room,chat) {
  // console.log('Chat', chat);
  $scope.messageHistory = chat;
  $scope.roomName = room;
});

$scope.logout = function() {
  socket.emit('disconnect');
  $location.path('/login');
};

$scope.kickMessage = '';

$scope.goBack = function(){
  socket.emit('partroom', $routeParams.roomID);
  $location.path('/roomlist/' + $scope.currentUser + '/');
};

$scope.kickOut = function(username, roomID) {
  if(checkIfOp($scope.currentUser)) {
    socket.emit('kick', {'user': username, 'room': roomID}, function (available) {
      if (available) {
        $scope.kickMessage = 'You kicked ' + username + ' out of the room';
      }
      else {
        $scope.kickMessage = 'Failed kicking ' + username + ' out of the room';
      }
    });
  }
  else {
    $scope.kickMessage = 'You do not have the rights to kick ' + username + ' out of the room';
  }
};

$scope.banUser = function(username, roomID) {
  if(checkIfOp($scope.currentUser)) {
    socket.emit('ban', {'user': username, 'room': roomID}, function (available) {
      if (available) {
        $scope.kickMessage = 'You banned ' + username + ' from the room';
      }
      else {
        $scope.kickMessage = 'Failed banning ' + username + ' from the room';
      }
    });
  }
  else {
    $scope.kickMessage = 'You do not have the rights to ban ' + username + ' from the room';
  }
};

}]);
