angular.module('chatApp').controller('RoomlistController', ['$scope', 'socket', '$location', '$routeParams', function ($scope, socket, $location, $routeParams) {

  $scope.errorMessage = '';
  $scope.roomName = '';
  $scope.currentUser = $routeParams.user;

  //UPDATE ROOMLIST
  socket.on('roomlist', function(rooms) {
    $scope.roomlist = rooms;
  });
  socket.emit('rooms');

  //UPDATE USERLIST
  socket.on('userlist', function(users) {
    $scope.activeUsers = users;
  });
  socket.emit('users');

  //LOGOUT

  $scope.logout = function() {
    socket.emit('disconnectPlease');
    $location.path('/login');
  };

  //CREATE NEW ROOM

  $scope.newRoom = function(){
    if($scope.roomName !== '') {
      socket.emit('joinroom', {'room': $scope.roomName});
    }
  };

  //MOVE TO ROOM

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

  //CLEAR INPUT FIELD

  $scope.clearfunction = function(event){
    event.roomName = '';
  };

  //MOVE TO PRIVATE ROOM
  $scope.moveToPrivateRoom = function(curr, item){

     var array = item.split('/');
     if(curr === $scope.currentUser) {
       console.log("HELLL");
       console.log($scope.currentUser);
       console.log(curr);

       socket.emit('roomExists', {'curr': $scope.currentUser, 'other': array[0]});
       socket.on('getRoom', function(room){

         if(room === "nothing") {
             $location.path('/private/' + $scope.currentUser + '/' + $scope.currentUser + '-' + item) ;

         } else {
             $location.path('/private/' + $scope.currentUser + '/' + room + '/0') ;
         }
     });
   }
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
  });
  socket.emit('privateRoom',$scope.currentUser);
}]);
