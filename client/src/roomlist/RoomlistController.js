// angular.module("chatApp").controller("RoomlistController", ["$scope".function($scope) {
angular.module('chatApp').controller('RoomlistController', ["$scope", "socket", "$location", "$routeParams", function ($scope, socket, $location, $routeParams) {

  socket.on("roomlist", function(rooms) {
    $scope.roomlist = rooms;
  });
  socket.emit('rooms');

  $scope.errorMessage = '';
  $scope.roomName = '';
  $scope.currentUser = $routeParams.user;

  $scope.newRoom = function(){
    socket.emit('joinroom', {'room': $scope.roomName});
  };

  $scope.moveToRoom = function(name){
    socket.emit('reasonroom', {'room': name}, function (available) {
      if (available) {
        $location.path('/room/' + $scope.currentUser + '/' + name);
      }
      else {
        $scope.errorMessage = 'Cannot join room';
      }
    });
  };

  socket.on('userlist', function(users) {
    // console.log(users);
    $scope.activeUsers = users;
  });
  socket.emit('users');


  $scope.moveToPrivateRoom = function(item){
    console.log("moveToPrivateRoom");
    console.log("item  " + item);
    var array = item.split('/');
    console.log("array 0  " + array[0]);
    socket.emit('roomExists', {'curr': $scope.currentUser, 'other': array[0]});
    console.log("eftir roomExists");
    socket.on('getRoom', function(room){
      console.log("inn i getRoom");
      console.log("Rooom  " + room);
      if(room === "nothing") {
        $location.path('/private/' + $scope.currentUser + '/' + $scope.currentUser + '-' + item) ;
      } else {
        $location.path('/private/' + $scope.currentUser + '/' + room + '/0') ;
      }
    });

  };

  $scope.moveToExistingPrivateRoom = function(item){
    console.log(  $location.path('/private/' + $scope.currentUser +  '/' +item));
        $location.path('/private/' + $scope.currentUser + '/' +  item + '/0') ;

  };

// hér þurfum við að vera með eh check hvort það hafa eh bæst við held ég
  socket.on('privateRoomList',function(list) {
    $scope.privateRoomList = list;
    console.log($scope.privateRoomList);
  });
  socket.emit('privateRoom',$scope.currentUser);




}]);
