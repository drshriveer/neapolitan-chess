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
    },

    canMoveTo: function(model){
      var validMoves = [];
      var x,y;
      var curX = model.attributes.x;
      var curY = model.attributes.y;
      var UDBlocks = []; //up down blocks
      var RLBlocks = []; //right left block
      var PSBlocks = []; //positive slope blocks
      var NSBlocks = []; //negative slope blocks

      for (var i = 0; i <= model.attributes.movementLimit; i++) {
        // foward and backward movements
        // first check that the square is on the board
        
        y = curY+i, x = curX;
        if(model.attributes.movesForwardAndBack && y >= 0 && y <= 7 && !this.checkBlocked(curY,y,UDBlocks,'y')){ 
          //if the block is in the middle of the object and the next location.
          var res = this.checkAndMakeValidMove(x,y, validMoves);
          if(res.blocked){ UDBlocks.push(res); }
        }

        y = curY-i, x = curX;
        if(model.attributes.movesForwardAndBack && y >= 0 && y <= 7 && !this.checkBlocked(curY,y,UDBlocks,'y')){ 
          //if the block is in the middle of the object and the next location.
          var res = this.checkAndMakeValidMove(x,y, validMoves);
          if(res.blocked){ UDBlocks.push(res); }
        }
        // right and left movements
        // first check that the square is on the board
       
        y = curY, x = curX+i;
        if(model.attributes.movesLeftAndRight && x >= 0 && x <= 7 && !this.checkBlocked(curX,x,RLBlocks,'x')){ 
          var res = this.checkAndMakeValidMove(x,y, validMoves);
          if(res.blocked){ RLBlocks.push(res); }
        }

        
        y = curY, x = curX-i;
        if(model.attributes.movesLeftAndRight && x >= 0 && x <= 7 && !this.checkBlocked(curX,x,RLBlocks,'x')){ 
          var res = this.checkAndMakeValidMove(x,y, validMoves);
          if(res.blocked){ RLBlocks.push(res); }
        }
        // diagonal movements
        // first check that the square is on the board
        
        y = curY+i, x = curX+i;
        if(model.attributes.movesDiagonally && y >= 0 && y <= 7 && x >= 0 && x <= 7 && !this.checkBlocked(curX,x,PSBlocks,'x')){ 
          var res = this.checkAndMakeValidMove(x,y, validMoves);
          if(res.blocked){ PSBlocks.push(res); }
        }
       
        y = curY-i, x = curX-i;
        if(model.attributes.movesDiagonally && y >= 0 && y <= 7 && x >= 0 && x <= 7 && !this.checkBlocked(curX,x,PSBlocks,'x')){ 
          var res = this.checkAndMakeValidMove(x,y, validMoves);
          if(res.blocked){ PSBlocks.push(res); }
        }
        // diagonal movements
        // first check that the square is on the board
        
        y = curY-i, x = curX+i;
        if(model.attributes.movesDiagonally && y >= 0 && y <= 7 && x >= 0 && x <= 7 && !this.checkBlocked(curX,x,NSBlocks,'x')){ 
          var res = this.checkAndMakeValidMove(x,y, validMoves);
          if(res.blocked){ NSBlocks.push(res); }
        }
        
        y = curY+i, x = curX-i;
        if(model.attributes.movesDiagonally && y >= 0 && y <= 7 && x >= 0 && x <= 7 && !this.checkBlocked(curX,x,NSBlocks,'x')){ 
          var res = this.checkAndMakeValidMove(x,y, validMoves);
          if(res.blocked){ NSBlocks.push(res); }
        }

      };

      return validMoves;
    },

    checkBlocked: function(cur, next, blocks, toCheck){
      for (var i = 0; i < blocks.length; i++) {
        if( (cur < blocks[i][toCheck] && blocks[i][toCheck] < next) ||
            (cur > blocks[i][toCheck] && blocks[i][toCheck] > next) ){
          return true;
        }
      };
      return false;
    },

    checkAndMakeValidMove: function(x, y, validMoves){
      var move = {x:x, y:y, highlightClass:""};
      var insquare = this.findWhere({x:x,y:y});
      if(insquare){
        return {blocked:true,x:x,y:y};
        // if(! insquare.attributes.isEnemy){ return false; }
        // move.highlightClass = "highlight-attack";
      }else{
        move.highlightClass = "highlight-move"; 
      }
      return validMoves.push(move);
    },

    isValidMove: function(x,y,model){
      var validMoves = this.canMoveTo(model);
      for (var i = 0; i < validMoves.length; i++) {
        if(validMoves[i]['x'] === x && validMoves[i]['y'] === y){
          return true;
        }
      };
      return false;


    }

  });

  return Pieces;
});