
/*
function RoomController($scope, $routeParams) {
  //þarf að vera sama nafn og i app.js
  var id = $routeParams.id;
}*/

angular.module('chatApp').controller('RoomController', ["$scope","socket","$routeParams","$location",
function ($scope, socket, $routeParams,$location) {
$scope.message = "";
$scope.roomName = $routeParams.roomID;

socket.emit('joinroom', {'room': $scope.roomName}, function (available) {
  //baned passa edge case
});

$scope.sendmsg = function() {
     socket.emit('sendmsg',{roomName: $scope.roomName, msg:$scope.message} );
    //  console.log("her!");
}

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
  $location.path('/roomlist/');
};

$scope.kickOut = function(username, roomID) {
  socket.emit('kick', {'user': username, 'room': roomID}, function (available) {
    //BARA CREATOR LAGA ÞAÐ!
    if (available) {
      $scope.kickMessage = 'You kicked ' + username + ' out of the room';
    }
    else {
      $scope.kickMessage = 'Failed kicking ' + username + ' out of the room';
    }
  });
};



}]);
