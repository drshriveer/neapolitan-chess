define(['app','backbone', 'marionette', 'models/piece', 'views/pieceView'], function(app, Backbone, Marionette, Piece, PieceView){

// the collection!
  var Pieces = Backbone.Collection.extend({
    model: Piece,

    initialize: function(options){
      //options expects {color: ,enemyColor};
      // this.color = options.color || "white";
      // this.enemyColor = options.enemyColor || "black";

      // app.vent.on('pieceMoved', this.refreshCaptureZones, this);
    },

    refreshCaptureZones: function(){
      // this.captureZones = this.calculateCaptureZones();
      // app.vent.trigger('highlightAttacks', this.captureZones);
    },

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
      var color = model.attributes.color;
      var enemyColor = (color === "black") ? "white" : "black";
      var UDBlocks = []; //up down blocks
      var RLBlocks = []; //right left block
      var PSBlocks = []; //positive slope blocks
      var NSBlocks = []; //negative slope blocks

      if(this.isNextToAParalyzer(curX,curY,enemyColor)){
        return validMoves;
      }
      // TODO: ADD MORE CHECKS: 
      // NOT TRUE -- SACROFICES ARE ALLOWED
        // CHECK THAT YOU DON'T MOVE THROUGH PAWN DEFENCES
        // CHECK THAT YOU DON'T MOVE INTO SYNC/KING TRAP
        // IF YOU ARE A PAWN, CHECK THAT YOU DON'T MOVE INTO A PAWN CHAMELION TRAP

      // CHECK THAT YOU'RE NOT NEXT TO A PARALYIZER
      // IF YOU ARE A JUMPER YOU CAN JUMP ONE OVER

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

    isNextToAParalyzer: function(x,y,enemyColor){
      var enempyParalyzer = this.findWhere({color:enemyColor,type:"paralyzer"});
      if(!enempyParalyzer){ return false;}
      var parX = enempyParalyzer.attributes.x;
      var parY = enempyParalyzer.attributes.y;
      if( Math.abs(parX - x) <= 1 && Math.abs(parY -y) <= 1 ){
        return true;
      }
      return false;
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
    //   STARTS CHECKING FOR CAPTURES !!!
    //

    checkForCaptures: function(x0,y0,model){
      var curX = model.attributes.x;
      var curY = model.attributes.y;
      var type = model.attributes.type;
      var color = model.attributes.color;
      var enemyColor = (color === "black") ? "white" : "black";
      var captures = [];

      switch (type){
        case 'pawn': 
          captures = this.calcPawnCaptures(color, enemyColor);
          break;
        case 'retractor':
          captures = this.calcRetractorCaptures(x0,y0,curX,curY,enemyColor,model);
          console.log("found captures:  ", captures);
          break;
        case 'synchronizer':
          // captures = this.calcQueenCaptures(color, enemyColor);
          // console.log("found captures:  ", captures);
          break;
        case 'jumper':
          // captures = this.calcQueenCaptures(color, enemyColor);
          // console.log("found captures:  ", captures);
          break;
        case 'chameleon':
          // captures = this.calcQueenCaptures(color, enemyColor);
          // console.log("found captures:  ", captures);
          break;
        default:
          break;
      }

      for (var i = 0; i < captures.length; i++) {
        var toDelete = this.findWhere(captures[i]);
        this.remove(toDelete);
        toDelete.destroy();
      };
    },





    // //
    // // calculate capture zones
    // //
    // calculateCaptureZones: function(){
    //   var captureZones = [];

    //   //find and concat the capture zones made by pawns
    //   captureZones = captureZones.concat(this.calcPawnCaptures("white"));
    //   captureZones = captureZones.concat(this.calcPawnCaptures("black"));
    //   // find and concat the capture zones made by retractors
    //   captureZones = captureZones.concat(this.calcRetractorCaptures("white","black"));
    //   captureZones = captureZones.concat(this.calcRetractorCaptures("black","white"));
    //   // 

    //   return captureZones;
    // },

    calcPawnCaptures: function(color, enemyColor){
      var collect = this;
      var pawnList = collect.where({type:"pawn",color:color});
      var captureZones = [];
      
      while(pawnList.length > 0){
        var pawn = pawnList.pop();
        var pawnX = pawn.attributes.x;
        var pawnY = pawn.attributes.y;

        _(pawnList).each(function(p){
          var pX = p.attributes.x;
          var pY = p.attributes.y;
          if(pawnX+2 === pX && pawnY === pY){
            if(collect.where({y:pawnY,x:pawnX+1, color:enemyColor}).length === 1){
              captureZones.push({y:pawnY,x:pawnX+1});
            }
          }
          if(pawnX-2 === pX && pawnY === pY){
            if(collect.where({y:pawnY,x:pawnX-1, color:enemyColor}).length === 1){
              captureZones.push({y:pawnY,x:pawnX-1});
            }
          }
          if(pawnY+2 === pY && pawnX === pX){
            if(collect.where({y:pawnY+1,x:pawnX, color:enemyColor}).length === 1){
              captureZones.push({y:pawnY+1,x:pawnX});
            }
          }
          if(pawnY-2 === pY && pawnX === pX){
            if(collect.where({y:pawnY-1,x:pawnX, color:enemyColor}).length === 1){
              captureZones.push({y:pawnY-1,x:pawnX});
            }
          }
        });
      };
      return captureZones;
    },

    calcRetractorCaptures: function(x0, y0, curX, curY, enemyColor, piece){
      var captures = [];
      var possibles = this.calcRetractorThreats(x0, y0, enemyColor, piece);
      // check if queen moved in the correct direction for those captures;
      for (var i = 0; i < possibles.length; i++) {
        var neededSlope = (possibles[i].xf - possibles[i].x)/(possibles[i].yf - possibles[i].y);
        var moveSlope = (curX - x0)/(curY - y0);
        if(neededSlope === moveSlope){
          captures.push({x:possibles[i].x,y:possibles[i].y});
        }
      };
      return captures;
    },

    calcRetractorThreats: function(x, y, enemyColor, piece){
      var captureZones = [];
      // in the X direction
      if(this.findWhere({x: x+1, y: y, color:enemyColor}) && this.isValidMove(x-1,y,piece)){
        captureZones.push({x:x+1, y:y, xf:x-1, yf:y});
      }
      if(this.findWhere({x: x-1, y: y, color:enemyColor}) && this.isValidMove(x+1,y,piece)){
        captureZones.push({x:x-1, y:y, xf:x+1, yf:y});
      }
      // in the Y direction
      if(this.findWhere({x: x, y: y+1, color:enemyColor}) && this.isValidMove(x,y-1,piece)){
        captureZones.push({x:x, y:y+1, xf:x, yf:y-1});
      }
      if(this.findWhere({x: x, y: y-1, color:enemyColor}) && this.isValidMove(x,y+1,piece)){
        captureZones.push({x:x, y:y-1, xf:x, yf:y+1});
      }
      // in positive slope sideways direction 
      if(this.findWhere({x: x+1, y: y+1, color:enemyColor}) && this.isValidMove(x-1,y-1,piece)){
        captureZones.push({x:x+1, y:y+1, xf:x-1, yf:y-1});
      }
      if(this.findWhere({x: x-1, y: y-1, color:enemyColor}) && this.isValidMove(x+1,y+1,piece)){
        captureZones.push({x:x-1, y:y-1, xf:x+1, yf:y+1});
      }
      // in negative slope sideways direction 
      if(this.findWhere({x: x-1, y: y+1, color:enemyColor}) && this.isValidMove(x+1,y-1,piece)){
        captureZones.push({x:x-1, y:y+1, xf:x+1, yf:y-1});
      }
      if(this.findWhere({x: x+1, y: y-1, color:enemyColor}) && this.isValidMove(x-1,y+1,piece)){
        captureZones.push({x:x+1, y:y-1, xf:x-1, yf:y+1});
      }

      return captureZones;
    }

    // calcSychronizerCaptures: function(color){
    //   var king = this.findWhere({color:color,type:'king'});
    //   var sychronizer = this.findWhere({color:color,type:'sychronizer'});
    //   var kingX = king.attributes.x;
    //   var kingY = king.attributes.y;
    //   var sychronizerX = sychronizer.attributes.x;
    //   var sychronizerY = sychronizer.attributes.y;
    //   return [{x:kingX, y:sychronizerY}, {x:sychronizerX, y:kingY}];
    //   // swap (a,b) (c,d) ===> (a,d) (c,b)

    // }

  });

  return Pieces;
});