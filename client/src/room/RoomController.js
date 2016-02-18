angular.module('chatApp').controller('RoomController', ["$scope", "socket", "$routeParams", "$location",
function ($scope, socket, $routeParams, $location) {
  $scope.message = "";
  $scope.roomName = $routeParams.roomID;
  $scope.currentUser = $routeParams.user;
  $scope.currentOps = [];
  $scope.currentUsers = [];
  $scope.kickMessage = '';

  socket.emit('joinroom', {'room': $scope.roomName}, function (available) {
    //baned passa edge case
  });

  $scope.sendmsg = function() {
       socket.emit('sendmsg',{roomName: $scope.roomName, msg:$scope.message} );
      //  console.log("her!");
  };

  socket.on('updatechat', function(room,chat) {
    // console.log('Chat', chat);
    $scope.messageHistory = chat;
    $scope.roomName = room;
  });

  $scope.logout = function() {
    socket.emit('disconnectPlease');
    $location.path('/login');
  };

  $scope.goBack = function(){
    socket.emit('partroom', $scope.roomName);
    $location.path('/roomlist/' + $scope.currentUser + '/');
  };

  $scope.checkIfOp = function() {
    for(var op in $scope.currentOps) {
      if(op === $scope.currentUser && $scope.currentOps.hasOwnProperty(op)) {
        return true;
      }
    }
    return false;
  };

  $scope.makeOp = function(username) {
    socket.emit('op', {'user': username, 'room': $scope.roomName}, function (available) {
      if (available) {
        $scope.kickMessage = 'You made ' + username + ' admin';
      }
      else {
        $scope.kickMessage = 'Failed to made ' + username + ' admin';
      }
    });
  };

  $scope.kickOut = function(username) {
    socket.emit('kick', {'user': username, 'room': $scope.roomName}, function (available) {
      if (available) {
        $scope.kickMessage = 'You kicked ' + username + ' out of the room';
      }
      else {
        $scope.kickMessage = 'Failed kicking ' + username + ' out of the room';
      }
    });
  };

  socket.on('kicked', function(roomName, user, ops) {
    if(roomName === $scope.roomName && user === $scope.currentUser) {
      //ef þetta ert þú sem er verið að kicka út -> til baka
      $location.path('/roomlist/' + $scope.currentUser + '/');
    }
  });

  $scope.banUser = function(username) {
    socket.emit('ban', {'user': username, 'room': $scope.roomName}, function (available) {
      if (available) {
        $scope.kickMessage = 'You banned ' + username + ' from the room';
      }
      else {
        $scope.kickMessage = 'Failed banning ' + username + ' from the room';
      }
    });
  };

  socket.on('banned', function(roomName, user, ops) {
    if(roomName === $scope.roomName && user === $scope.currentUser) {
      //ef þetta ert þú sem er verið að banna -> til baka
      $location.path('/roomlist/' + $scope.currentUser + '/');
    }
  });

  socket.on('updateusers', function(roomName, users, ops) {
    console.log(ops);
    console.log(users);
    if(roomName == $scope.roomName) {
      //hann þurrkar þetta út ef creator fer útur grúppunni
      $scope.currentOps = ops;
      $scope.currentUsers = users;
    }
  });

  $scope.clearfunction = function(event){
    event.message = null;
  };

}]);
