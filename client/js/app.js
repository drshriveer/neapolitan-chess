var app = angular.module('Chess', ['ngRoute','lvl.directives.dragdrop']);
//set up routes
app.config(function($routeProvider) {
  $routeProvider
  .when("/", {templateUrl: 'templates/home.html'})
  .when("/about", {templateUrl: '/templates/about.html'})
  .when("/rules", {templateUrl: '/templates/rules.html'})
  .when("/board", {controller: 'board', templateUrl: '/templates/board.html'})
  .when("/play", {controller: 'play', templateUrl: '/templates/rules.html'})
  .otherwise({redirectTo: '/'});
});

app.controller('board', function($scope){
  $scope.url = 'images/pieces/Black_B.png';
  $scope.row_0 = [new Paralyzer(0,0,'black'), new Jumper(1,0,'black'), new Chameleon(2,0,'black'), new Retractor(3,0,'black'), new King(4,0,'black'), new Chameleon(5,0,'black'), new Jumper(6,0,'black'), new Synchronizer(7,0,'black')];
  $scope.row_1 = [new Pawn(0,1,'black'), new Pawn(1,1,'black'), new Pawn(2,1,'black'), new Pawn(3,1,'black'), new Pawn(4,1,'black'), new Pawn(5,1,'black'), new Pawn(6,1,'black'), new Pawn(7,1,'black')];
  $scope.row_2 = [null,null,null,null,null,null,null,null];
  $scope.row_3 = [null,null,null,null,null,null,null,null];
  $scope.row_4 = [null,null,null,null,null,null,null,null];
  $scope.row_5 = [null,null,null,null,null,null,null,null];
  $scope.row_6 = [new Pawn(0,6,'white'), new Pawn(1,6,'white'), new Pawn(2,6,'white'), new Pawn(3,6,'white'), new Pawn(4,6,'white'), new Pawn(5,6,'white'), new Pawn(6,6,'white'), new Pawn(7,6,'white')];
  $scope.row_7 = [new Paralyzer(0,7,'white'), new Jumper(1,7,'white'), new Chameleon(2,7,'white'), new Retractor(3,7,'white'), new King(4,7,'white'), new Chameleon(5,7,'white'), new Jumper(6,7,'white'), new Synchronizer(7,7,'white')];


  $scope.dropped = function(dragEl, dropEl, row, col) {
    // this is your application logic, do whatever makes sense
    var drag = angular.element(dragEl);
    var drop = angular.element(dropEl);

    row[col] = new Pawn(0,0,'blue');

    console.log("the col & row", row, col);
    console.log(dragEl);
    console.log(dropEl);
    console.log("The element " + drag.attr('id') + " has been dropped on " + drop.attr("id") + "!");


  };

});



//
// services
//







//
// controllers:
//

// app.controller('board', function($scope, $http, $q) {
//   $scope.board = Piece.makeBlankBoard();
//   // load board: 
//   console.log('loading the board!');

//   var initilizeBoard = function(){
//     for (var i = 0; i < $scope.board[1].length; i++) {
//       $scope.board[1][i] = new Pawn(i, 1);
//     };
//   };

// });



// angular.module('Chess', [])


// })
