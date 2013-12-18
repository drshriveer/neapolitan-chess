define(['backbone', 'marionette', 'models/piece', 'views/pieceView'], function(Backbone, Marionette, Piece, PieceView){

// the collection!
  var Pieces = Backbone.Collection.extend({
    model: Piece,

    makeTeam: function(color, pawn_row, other_row){
      // Build Pawns
      var rowTypes = ["paralyzer","jumper","chameleon","retractor","king","chameleon","jumper","sychronizer"];
      for (var i = 0; i < 8; i++) {
      // options.x, options.y, options.type, options.color
        this.add(new Piece({x:i, y:pawn_row,type:'pawn', color:color, canMove:true}));
        this.add(new Piece({x:i, y:other_row,type:rowTypes[i], color:color, canMove:true}));
      };
    },

    init: function(){
      this.each(function(model){
        new PieceView({model:model});
      });
    }

  });

  return Pieces;
});