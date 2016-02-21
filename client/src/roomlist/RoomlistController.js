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
    socket.emit('joinroom', {'room': name}, function (available) {
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


  /*$scope.moveToPrivateRoom = function(item){

    var array = item.split('/');
    socket.emit('roomExists', {'curr': $scope.currentUser, 'other': array[0]});
    socket.on('getRoom', function(room){
      if(room === "nothing") {
        $location.path('/private/' + $scope.currentUser + '/' + $scope.currentUser + '-' + item) ;
      } else {
        //add to room list eða make room
        $location.path('/private/' + $scope.currentUser + '/' + room + '/0') ;
      }
    });

  };

  $scope.moveToExistingPrivateRoom = function(item){
        $location.path('/private/' + $scope.currentUser + '/' +  item + '/0') ;

  };*/

  //MOVE TO PRIVATE ROOM
  $scope.moveToPrivateRoom = function(curr, item){

    var array = item.split('/');



        if(curr === $scope.currentUser) {
          console.log("HELLL");
          console.log($scope.currentUser);
          console.log(curr);

          socket.emit('roomExists', {'curr': $scope.currentUser, 'other': array[0]});
          socket.on('getRoom', function(room){
          roomArray = room.split('-');
          if(curr == roomArray[0] || curr == roomArray[1])
          {
              if(room === "nothing") {
                $location.path('/private/' + $scope.currentUser + '/' + $scope.currentUser + '-' + item) ;

              } else {

                $location.path('/private/' + $scope.currentUser + '/' + room + '/0') ;
              }
          }
          });
        }
      //});
      //}
    //});
   };

  $scope.moveToExistingPrivateRoom = function(curr, item){
    if(curr === $scope.currentUser) {
      $location.path('/private/' + $scope.currentUser + '/' +  item + '/0') ;
    }
  };
// hér þurfum við að vera með eh check hvort það hafa eh bæst við held ég
  socket.on('privateRoomList',function(list) {
    $scope.privateRoomList = list;
    console.log($scope.privateRoomList);
  });///er /etta ad gera eh ??? elin
  socket.emit('privateRoom',$scope.currentUser);




}]);
