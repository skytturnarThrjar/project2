angular.module('chatApp').controller('PrivateMessageController', ['$scope', 'socket', '$routeParams', '$location',
function ($scope, socket, $routeParams, $location) {

$scope.message = "";
$scope.currentUser = $routeParams.user;
$scope.roomName = $routeParams.room;
$scope.friendName = $routeParams.friend;

console.log($scope.roomName);
//NEW BEGINING
socket.emit('joinPrivateRoom', {'room': $scope.roomName});

socket.on('currUserFromServer', function(curr,roomName) {
  console.log($scope.roomName);
  console.log($scope.currentUser);
  if(roomName === $scope.roomName && curr === $scope.currentUser) {

      if($scope.currentUser + '-' + $scope.friendName === $routeParams.room || $scope.friendName + '-' + $scope.currentUser === $routeParams.room ) {
        socket.emit('joinPrivateRoom', {'room': $scope.roomName});

      }
    }
});



  //SEND MESSAGE
  //
  // $scope.sendPrivatemsg = function() {
  //      socket.emit('sendmsg',{roomName: $scope.roomName, msg:$scope.message} );
  // };
  $scope.sendPrivatemsg = function() {
    socket.emit('privatemsg',{ currentUser:$scope.currentUser , nick: $scope.friendName, roomName:$scope.roomName,  message:$scope.message});
  };

  socket.on('currUserFromServer', function(curr,roomName) {
    console.log($scope.roomName);
    console.log($scope.currentUser);
    if(roomName === $scope.roomName && curr === $scope.currentUser) {
      socket.on('recv_privatemsg', function(room ,message) {
        console.log("ATH :");
        console.log($scope.currentUser + '-' + $scope.friendName);
        console.log($routeParams.room);
        if($scope.currentUser + '-' + $scope.friendName === $routeParams.room || $scope.friendName + '-' + $scope.currentUser === $routeParams.room ) {
          console.log( "herna! ");
          $scope.messageHistory = message;
        }
      });    }
  });


}]);
