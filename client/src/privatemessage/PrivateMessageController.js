angular.module('chatApp').controller('PrivateMessageController', ['$scope', 'socket', '$routeParams', '$location',
function ($scope, socket, $routeParams, $location) {

  $scope.message = '';
  $scope.currentUser = $routeParams.user;
  $scope.roomName = $routeParams.room;
  $scope.friendName = $routeParams.friend;

  //RECEIVE PRIVATE MESSAGE

  socket.on('recv_privatemsg', function(current, message) {
    if($scope.currentUser === current) {
      $scope.currentUser = current;
      $scope.messageHistory = message;
    }
  });

  //SEND PRIVATE MESSAGE
  $scope.privatemsg = function() {
  socket.emit('privatemsg',{ currentUser:$scope.currentUser , nick: $scope.friendName, roomName:$scope.roomName,  message:$scope.message});
};

  //BACK BUTTON

  $scope.goBack = function(){
    $location.path('/roomlist/' + $scope.currentUser + '/');
  };

  //LOG OUT BUTTON

  $scope.logout = function() {
    socket.emit('disconnectPlease');
    $location.path('/login');
  };

  //CLEAR INPUT FIELD

  $scope.clearfunction = function(){
    $scope.message = '';
  };

  //CHECK IF MESSAGE IS EMPTY

  $scope.messageNotEmpty = function() {
    if($scope.message === '' || $scope.message === null) {
      return false;
    }
    else {
      return true;
    }
  };
}]);
