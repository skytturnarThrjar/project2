angular.module('chatApp').controller('RoomlistController', ['$scope', 'socket', '$location', '$routeParams', function ($scope, socket, $location, $routeParams) {

  $scope.errorMessage = '';
  $scope.roomName = '';
  $scope.currentUser = $routeParams.user;

  //UPDATE ROOMLIST
  socket.on('roomlist', function(rooms) {
    $scope.roomlist = rooms;
  });
  socket.emit('rooms');

  //UPDATE USERLIST
  socket.on('userlist', function(users) {
    $scope.activeUsers = users;
  });
  socket.emit('users');

  //LOGOUT

  $scope.logout = function() {
    socket.emit('disconnectPlease');
    $location.path('/login');
  };

  //CREATE NEW ROOM

  $scope.newRoom = function(){
    if($scope.roomName !== '') {
      socket.emit('joinroom', {'room': $scope.roomName});
    }
  };

  //MOVE TO ROOM

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

  //CLEAR INPUT FIELD

  $scope.clearfunction = function(event){
    event.roomName = '';
  };
}]);
