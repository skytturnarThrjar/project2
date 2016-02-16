
/*
function RoomController($scope, $routeParams) {
  //þarf að vera sama nafn og i app.js
  var id = $routeParams.id;
}*/

angular.module('chatApp').controller('RoomController', ["$scope","socket","$routeParams","$location",
function ($scope, socket, $routeParams,$location) {
$scope.message = "";
$scope.roomName = $routeParams.roomID;


$scope.sendmsg = function() {
     socket.emit('sendmsg',{roomName: $scope.roomName, msg:$scope.message} );
    //  console.log("her!");
}

socket.on('updatechat', function(room,chat) {
  // console.log('Chat', chat);
  $scope.messageHistory = chat;
  $scope.roomName = room;
});

socket.on('userlist', function(users) {
  // console.log(users);
  $scope.roomlist = users;
});
socket.emit("users");

$scope.logout = function() {
  socket.emit('disconnect');
  $location.path('/login');
}
}]);
