define(['backbone', 'marionette', 'models/pieces','views/pieceView'], function( Backbone, Marionette, Pieces, PieceView){
  "use strict"

  var app = new Backbone.Marionette.Application;
  // add the regions
  app.addRegions({
    header: "#main-header",
    footer: "#main-footer",
    content: "#main",
    controler: "#control",
    info: "#info"
  });
  
  app.on("initialize:before", function(){

  });

  app.addInitializer(function(){
    // app.router = new Router();
    // Backbone.history.start();
    // console.log('initialized router');
  });

  app.vent.on("startGame", function(e){
    var pz = new Pieces();
    pz.makeTeam("white", 1, 0);
    pz.makeTeam("black", 6, 7);

    // console.log("all them beautiful pieces:", pieces);
    // new PiecesView(pz);
    pz.each(function(model){
      new PieceView({model:model});
    });

  });

  return app;

});





  // $scope.url = 'images/pieces/Black_B.png';
  // $scope.row_0 = [new Paralyzer(0,0,'black'), new Jumper(1,0,'black'), new Chameleon(2,0,'black'), new Retractor(3,0,'black'), new King(4,0,'black'), new Chameleon(5,0,'black'), new Jumper(6,0,'black'), new Synchronizer(7,0,'black')];
  // $scope.row_1 = [new Pawn(0,1,'black'), new Pawn(1,1,'black'), new Pawn(2,1,'black'), new Pawn(3,1,'black'), new Pawn(4,1,'black'), new Pawn(5,1,'black'), new Pawn(6,1,'black'), new Pawn(7,1,'black')];
  // $scope.row_2 = [null,null,null,null,null,null,null,null];
  // $scope.row_3 = [null,null,null,null,null,null,null,null];
  // $scope.row_4 = [null,null,null,null,null,null,null,null];
  // $scope.row_5 = [null,null,null,null,null,null,null,null];
  // $scope.row_6 = [new Pawn(0,6,'white'), new Pawn(1,6,'white'), new Pawn(2,6,'white'), new Pawn(3,6,'white'), new Pawn(4,6,'white'), new Pawn(5,6,'white'), new Pawn(6,6,'white'), new Pawn(7,6,'white')];
  // $scope.row_7 = [new Paralyzer(0,7,'white'), new Jumper(1,7,'white'), new Chameleon(2,7,'white'), new Retractor(3,7,'white'), new King(4,7,'white'), new Chameleon(5,7,'white'), new Jumper(6,7,'white'), new Synchronizer(7,7,'white')];
