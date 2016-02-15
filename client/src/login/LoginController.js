"use strict";

//ng Annotate svo að það se hægt að minifya koðann
angular.module("chatApp").controller("LoginController", ["$scope",
function ($scope,socket) {
  //hægt að gera þetta svona en ekki mælt með því (eins og placeholder held ég?)
  /*$scope.login = "vala";
  $scope.pass = "flottlykilorð";*/
  $scope.username = "";
  $scope.errorMessage = "";
  $scope.login = function(){
        socket.emit("adduser", "lubs", function(available){
          if (available){
              // The "dabs" username is not taken!
          }
  			};

  //
  // $scope.Login = function Login () {
  // //  var socket = io.connect('http://localhost:8080');
  //     socket.emit("adduser", $scope.user, function(available){
  //       $scope.available = available;
  //       console.log("works");
  //
  //         if (available){
  //             // The "dabs" username is not taken!
  //             $location("#/roomlist");
  //             console.log("works");
  //         }
  //         else {
  //           $scope.errorMessage = "Innskráning misstókst";
  //         }
  //         });
  // };

}]);
