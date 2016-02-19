angular.module('chatApp').controller('PrivateMessageController', ['$scope', 'socket', '$routeParams', '$location',
function ($scope, socket, $routeParams, $location) {

$scope.message = "";
$scope.currentUser = $routeParams.user;
$scope.privatChatFriend = $routeParams.ChatFriend;
$scope.isNewChat =  $routeParams.newChat;
console.log('isNewChat:' + $scope.isNewChat);

if($scope.isNewChat === '0' ) // 1 is new
{
  console.log("ER 0 !!!");
    socket.emit('joinPrivateRoom',  $scope.privatChatFriend);
}

socket.emit('recv_privatemsg');

socket.on('recv_privatemsg', function(current ,message) {
  $scope.currentUser = current;
  $scope.messageHistory = message;
  console.log(message);
  console.log(current);
});


  $scope.privatemsg = function() {
      console.log("privatemsg AAAABBBBBBBBBBBBBBBBBBBBBBBBBBBBBA");
      console.log("NAME" + $scope.privatChatFriend);
      console.log("VOL 2 + " + $routeParams.ChatFriend );
      if( $routeParams.ChatFriend.includes('-')){
        console.log("Komst inní includes");
        var array = $routeParams.ChatFriend.split('-');
        console.log(array[0]);
        if( array[0] == $scope.currentUser) {
          console.log("Current User : " + $scope.currentUser + "arrayið segir : " + array[0]);
          console.log("hinn nick : " + array[1]);
          $scope.friendName =  array[1];
        }
        else {
          $scope.friendName =  array[0];
        }
      }
      else{

        $scope.friendName = $scope.privatChatFriend;

      }
      console.log("privatemsg end");
      console.log("FREND NAME BEFORE SOCEKT " + $scope.friendName);
       socket.emit('privatemsg',{currentUser:$scope.currentUser , nick: $scope.friendName, message:$scope.message} , function (available) {
        // $location.path('/private/' + $scope.currentUser + '/' + $scope.currentUser +'-' +$scope.friendName+ '/0') ;

         if (available) {
           console.log( "CURRENT "+ $scope.currentUser);
           console.log( "FRIEND " + $scope.friendName);

          //  $location.path('/private/' + $scope.currentUser + '/' + $scope.currentUser +'-' +$scope.friendName+ '/0') ;
           console.log("Working");
          }
          else {
           $scope.errorMessage = "obbosí";
         }
       });
  };

}]);
