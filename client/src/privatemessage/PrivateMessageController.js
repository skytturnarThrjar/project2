angular.module('chatApp').controller('PrivateMessageController', ['$scope', 'socket', '$routeParams', '$location',
function ($scope, socket, $routeParams, $location) {

$scope.message = "";
$scope.currentUser = $routeParams.user;
$scope.roomName = $routeParams.room;
$scope.friendName = $routeParams.friend;

//NEW BEGINING
socket.emit('joinPrivateRoom', {'room': $scope.roomName});

//UPDATE CHAT

// socket.on('updatePrivateChat', function(room,chat) {
//   if($scope.roomName == room) {
//     $scope.messageHistory = chat;
//     $scope.roomName = room;
//   }
// });


socket.on('recv_privatemsg', function(room ,message) {
  if($scope.currentUser + '-' + $scope.friendName === $routeParams.room || $scope.friendName + '-' + $scope.currentUser === $routeParams.room ) {
    $scope.messageHistory = message;
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


}]);
