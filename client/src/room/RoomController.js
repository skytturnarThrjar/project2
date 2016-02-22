angular.module('chatApp').controller('RoomController', ['$scope', 'socket', '$routeParams', '$location', '$timeout',
function($scope, socket, $routeParams, $location, $timeout) {
  $scope.message = '';
  $scope.roomName = $routeParams.roomID;
  $scope.currentUser = $routeParams.user;
  $scope.currentOps = [];
  $scope.currentUsers = [];
  $scope.bannedUsers = [];
  $scope.infoMessage = '';
  $scope.showMessage = false;
  $scope.messageTimer = false;

  //GET CHAT

  socket.emit('joinroom', {'room': $scope.roomName}, function(available) {});

  //CHECK UP ON THE SERVER MESSAGE

  socket.on('servermessage', function(mess, room, username) {
    if(mess == 'join') {
      $scope.infoMessage = username + ' just joined the room';
      $scope.messageOnTime();
    }
    if(mess == 'part') {
      $scope.infoMessage = username + ' just left the room';
      $scope.messageOnTime();
    }
  });

  //UPDATE CHAT

  socket.on('updatechat', function(room, chat) {
    if($scope.roomName == room) {
      $scope.messageHistory = chat;
      $scope.roomName = room;
    }
  });


  //TIMER ON MESSAGES

  $scope.messageOnTime = function() {
    if($scope.messageTimer) {
      $timeout.cancel($scope.messageTimer);
    }
    $scope.showMessage = true;
    $scope.messageTimer = $timeout(function() {
      $scope.showMessage = false;
    }, 2000);
  };

  //SEND MESSAGE

  $scope.sendmsg = function() {
    socket.emit('sendmsg', {roomName: $scope.roomName, msg: $scope.message});
  };

  //BACK BUTTON

  $scope.goBack = function() {
    socket.emit('partroom', $scope.roomName);
    $location.path('/roomlist/' + $scope.currentUser + '/');
  };

  //LOG OUT BUTTON

  $scope.logout = function() {
    socket.emit('disconnectPlease');
    $location.path('/login');
  };

  //CHECK IF USER IS AN OP

  $scope.checkIfOp = function() {
    for(var op in $scope.currentOps) {
      if(op === $scope.currentUser && $scope.currentOps.hasOwnProperty(op)) {
        return true;
      }
    }
    return false;
  };

  // MAKE ANOTHER USER AN OP

  $scope.makeOp = function(username) {
    socket.emit('op', {'user': username, 'room': $scope.roomName}, function(available) {
      if (available) {
        $scope.infoMessage = 'You made ' + username + ' admin';
        $scope.messageOnTime();
      }
      else {
        $scope.infoMessage = 'Failed to made ' + username + ' admin';
        $scope.messageOnTime();
      }
    });
  };

  // KICKOUT

  $scope.kickOut = function(username) {
    socket.emit('kick', {'user': username, 'room': $scope.roomName}, function(available) {
      if(available) {
        $scope.infoMessage = 'You kicked ' + username + ' out of the room';
        $scope.messageOnTime();
      }
      else {
        $scope.infoMessage = 'Failed kicking ' + username + ' out of the room';
        $scope.messageOnTime();
      }
    });
  };

  socket.on('kicked', function(roomName, user, ops) {
    if(roomName === $scope.roomName && user === $scope.currentUser) {
      //ef þetta ert þú sem er verið að kicka út -> til baka
      $location.path('/roomlist/' + $scope.currentUser + '/');
    }
  });

  //BAN USER

  $scope.banUser = function(username) {
    socket.emit('ban', {'user': username, 'room': $scope.roomName}, function(available) {
      if(available) {
        $scope.infoMessage = 'You banned ' + username + ' from the room';
        $scope.messageOnTime();
      }
      else {
        $scope.infoMessage = 'Failed banning ' + username + ' from the room';
        $scope.messageOnTime();
      }
    });
  };

  socket.on('banned', function(roomName, user, ops) {
    if(roomName === $scope.roomName && user === $scope.currentUser) {
      //ef þetta ert þú sem er verið að banna -> til baka
      $scope.bannedUsers.push(user);
      $location.path('/roomlist/' + $scope.currentUser + '/');
    }
  });

  //UPDATE CURRENT USERS

  socket.on('updateusers', function(roomName, users, ops) {
    if(roomName == $scope.roomName) {
      $scope.currentOps = ops;
      $scope.currentUsers = users;
    }
  });

  //CLEAR INPUT FIELD

  $scope.clearfunction = function() {
    $scope.message = '';
  };

  //CHECK IF THERE IS A MESSAGE

  $scope.messageNotEmpty = function() {
    if($scope.message === '' || $scope.message === null) {
      return false;
    }
    else {
      return true;
    }
  };
}]);
