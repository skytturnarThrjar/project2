angular.module('chatApp').controller('PrivateMessageController', ['$scope', 'socket', '$routeParams', '$location',
function ($scope, socket, $routeParams, $location) {

$scope.message = "";
$scope.currentUser = $routeParams.user;
$scope.privatChatFriend = $routeParams.ChatFriend;
$scope.isNewChat =  $routeParams.newChat;

if($scope.isNewChat === '0') // 1 is new
{
    socket.emit('joinPrivateRoom',  $scope.privatChatFriend);
}

socket.emit('recv_privatemsg');

socket.on('recv_privatemsg', function(current ,message) {
  if($scope.currentUser === current) {
    $scope.currentUser = current;
    $scope.messageHistory = message;
  }
});


  $scope.privatemsg = function() {

      if( $routeParams.ChatFriend.includes('-')){
        var array = $routeParams.ChatFriend.split('-');
        if( array[0] === $scope.currentUser) {
          $scope.friendName =  array[1];
        } else {
          $scope.friendName =  array[0];
        }
      }
      else{
        $scope.friendName = $scope.privatChatFriend;
      }
       socket.emit('privatemsg',{currentUser:$scope.currentUser , nick: $scope.friendName, message:$scope.message} , function (available) {
        // $location.path('/private/' + $scope.currentUser + '/' + $scope.currentUser +'-' +$scope.friendName+ '/0') ;

         if (available) {

          }
          else {
           $scope.errorMessage = "obbosí";
         }
       });
  };

}]);
