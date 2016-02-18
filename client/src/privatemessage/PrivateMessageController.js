angular.module('chatApp').controller('PrivateMessageController', ['$scope', 'socket', '$routeParams', '$location',
function ($scope, socket, $routeParams, $location) {

$scope.message = "";
$scope.currentUser = $routeParams.user;


  $scope.privatemsg = function() {
       socket.emit('privatemsg',{currentUser:$scope.currentUser , nick:"Elin", message:$scope.message} , function (available) {
         if (available) {
          }
          else {
           $scope.errorMessage = "fila";
         }
       });

      //  $scope.currentUser.socket.emit('recv_privatemsg');
      socket.on('recv_privatemsg', function(current ,message) {
        $scope.currentUser = current;
        $scope.messageHistory = message;
        console.log(message);
        console.log(current);
      });

  };

}]);
