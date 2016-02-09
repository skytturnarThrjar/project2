"use strict";

//ng Annotate svo að það se hægt að minifya koðann
angular.module("chatApp").controller("LoginController", function LoginController($scope, ChatResource) {
  //hægt að gera þetta svona en ekki mælt með því (eins og placeholder held ég?)
  /*$scope.login = "vala";
  $scope.pass = "flottlykilorð";*/
  $scope.login = "";
  $scope.pass = "";
  $scope.errorMessage = "";

  $scope.onLogin = function onLogin () {
    ChatResource.login($scope.user, $scope.pass, function(success) {
      if(!success) {
        //ef login mistekst
        $scope.errorMessage = "Innskráning misstókst";
      }
      else {
        //ef login tekst
        //senda notanda á herbergi
        //þetta sendir notanda á nýtt url (kannski þarf ekki #)
        $location("#/roomlist");
      }
    });
  };
});
