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

    //
    // calculate valid moves
    //
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
        // down movements        
        y = curY+i, x = curX;
        if(model.attributes.movesForwardAndBack && y >= 0 && y <= 7 && !this.checkBlocked(curY,y,UDBlocks,'y')){ 
          var res = this.checkAndMakeValidMove(x,y, validMoves);
          if(res.blocked){ UDBlocks.push(res); }
        }
        // up movements
        y = curY-i, x = curX;
        if(model.attributes.movesForwardAndBack && y >= 0 && y <= 7 && !this.checkBlocked(curY,y,UDBlocks,'y')){ 
          var res = this.checkAndMakeValidMove(x,y, validMoves);
          if(res.blocked){ UDBlocks.push(res); }
        }
        // right movements
        y = curY, x = curX+i;
        if(model.attributes.movesLeftAndRight && x >= 0 && x <= 7 && !this.checkBlocked(curX,x,RLBlocks,'x')){ 
          var res = this.checkAndMakeValidMove(x,y, validMoves);
          if(res.blocked){ RLBlocks.push(res); }
        }
        // left movements
        y = curY, x = curX-i;
        if(model.attributes.movesLeftAndRight && x >= 0 && x <= 7 && !this.checkBlocked(curX,x,RLBlocks,'x')){ 
          var res = this.checkAndMakeValidMove(x,y, validMoves);
          if(res.blocked){ RLBlocks.push(res); }
        }
        // positive slope up & right movement        
        y = curY+i, x = curX+i;
        if(model.attributes.movesDiagonally && y >= 0 && y <= 7 && x >= 0 && x <= 7 && !this.checkBlocked(curX,x,PSBlocks,'x')){ 
          var res = this.checkAndMakeValidMove(x,y, validMoves);
          if(res.blocked){ PSBlocks.push(res); }
        }
        // positive slope down & left movement        
        y = curY-i, x = curX-i;
        if(model.attributes.movesDiagonally && y >= 0 && y <= 7 && x >= 0 && x <= 7 && !this.checkBlocked(curX,x,PSBlocks,'x')){ 
          var res = this.checkAndMakeValidMove(x,y, validMoves);
          if(res.blocked){ PSBlocks.push(res); }
        }
        // negative slope down & right movement
        y = curY-i, x = curX+i;
        if(model.attributes.movesDiagonally && y >= 0 && y <= 7 && x >= 0 && x <= 7 && !this.checkBlocked(curX,x,NSBlocks,'x')){ 
          var res = this.checkAndMakeValidMove(x,y, validMoves);
          if(res.blocked){ NSBlocks.push(res); }
        }
        // negative slope up & left movement
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
      var insquare = this.findWhere({x:x,y:y});
      if(insquare){
        return {blocked:true,x:x,y:y};
      }
      return validMoves.push({x:x, y:y});
    },

    isValidMove: function(x,y,model){
      var validMoves = this.canMoveTo(model);
      for (var i = 0; i < validMoves.length; i++) {
        if(validMoves[i]['x'] === x && validMoves[i]['y'] === y){
          return true;
        }
      };
      return false;
    },

    //
    // calculate capture zones
    //
    calculateCaptureZones: function(){
      var captureZones = [];

      //find and concat the capture zones made by pawns
      captureZones = captureZones.concat(this.calcPawnCaptures(this.where({type:"pawn",color:"white"})));
      captureZones = captureZones.concat(this.calcPawnCaptures(this.where({type:"pawn",color:"black"})));

      return captureZones;
    },
    calcPawnCaptures: function(pawnList){
      var captureZones = [];
      
      while(pawnList.length > 0){
        var pawn = pawnList.pop();
        var pawnX = pawn.attributes.x;
        var pawnY = pawn.attributes.y;

        _(pawnList).each(function(p){
          var pX = p.attributes.x;
          var pY = p.attributes.y;
          if(pawnX+2 === pX && pawnY === pY){
            captureZones.push({y:pawnY,x:pawnX+1});
          }
          if(pawnX-2 === pX && pawnY === pY){
            captureZones.push({y:pawnY,x:pawnX-1});
          }
          if(pawnY+2 === pY && pawnX === pX){
            captureZones.push({y:pawnY+1,x:pawnX});
          }
          if(pawnY-2 === pY && pawnX === pX){
            captureZones.push({y:pawnY-1,x:pawnX});
          }
        });
      };

      console.log("checkingPawns", captureZones)
      // checker(pawnList.pop);
      // captureZones.push({x:4,y:4});
      return captureZones;
    },

  });

  return Pieces;
});