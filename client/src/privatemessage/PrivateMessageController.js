angular.module('chatApp').controller('PrivateMessageController', ['$scope', 'socket', '$routeParams', '$location',
function ($scope, socket, $routeParams, $location) {

$scope.message = "";
$scope.currentUser = $routeParams.user;
$scope.privatChatFriend = $routeParams.ChatFriend ;



  $scope.privatemsg = function() {
       socket.emit('privatemsg',{currentUser:$scope.currentUser , nick:"Elin", message:$scope.message} , function (available) {
         if (available) {
          }
          else {
           $scope.errorMessage = "obbosí";
         }
       });

      socket.on('recv_privatemsg', function(current ,message) {
        $scope.currentUser = current;
        $scope.messageHistory = message;
        console.log(message);
        console.log(current);
      });
      socket.emit('recv_privatemsg');


  };

}]);
