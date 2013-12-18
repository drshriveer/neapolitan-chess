define(['app','marionette','backbone'], function(app, Backbone, Marionette){

  // static variable setup;
  var typeAttributes = {
    pawn: {
      movesDiagonally: false,
      movementLimit: 2,
      img_src: {
        'black': "images/pieces/Black_P.png",
        'blue': "images/pieces/Blue_P.png",
        'brown': "images/pieces/Brown_P.png",
        'clear': "images/pieces/Clear_white_P.png",
        'white': "images/pieces/White_P.png",
        'yellow': "images/pieces/Yellow_P.png"
      }
    },
    paralyzer: {
      movesDiagonally: false,
      img_src: {
        black: "images/pieces/Black_UR.png",
        blue: "images/pieces/Blue_UR.png",
        brown: "images/pieces/Brown_UR.png",
        clear: "images/pieces/Clear_white_UR.png",
        white: "images/pieces/White_UR.png",
        yellow: "images/pieces/Yellow_UR.png"
      }
    },
    chameleon: {
      img_src: {
        black: "images/pieces/Black_B.png",
        blue: "images/pieces/Blue_B.png",
        brown: "images/pieces/Brown_B.png",
        clear: "images/pieces/Clear_white_B.png",
        white: "images/pieces/White_B.png",
        yellow: "images/pieces/Yellow_B.png"
      }
    },
    retractor: {
      img_src: {
        black: "images/pieces/Black_Q.png",
        blue: "images/pieces/Blue_Q.png",
        brown: "images/pieces/Brown_Q.png",
        clear: "images/pieces/Clear_white_Q.png",
        white: "images/pieces/White_Q.png",
        yellow: "images/pieces/Yellow_Q.png"
      }
    },
    king: {
      movementLimit: 1,
      img_src: {
        black: "images/pieces/Black_K.png",
        blue: "images/pieces/Blue_K.png",
        brown: "images/pieces/Brown_K.png",
        clear: "images/pieces/Clear_white_K.png",
        white: "images/pieces/White_K.png",
        yellow: "images/pieces/Yellow_K.png"
      }
    },
    sychronizer: {
      img_src: {
        black: "images/pieces/Black_R.png",
        blue: "images/pieces/Blue_R.png",
        brown: "images/pieces/Brown_R.png",
        clear: "images/pieces/Clear_white_R.png",
        white: "images/pieces/White_R.png",
        yellow: "images/pieces/Yellow_R.png"
      }
    },
    jumper: {
      img_src: {
        black: "images/pieces/Black_N.png",
        blue: "images/pieces/Blue_N.png",
        brown: "images/pieces/Brown_N.png",
        clear: "images/pieces/Clear_white_N.png",
        white: "images/pieces/White_N.png",
        yellow: "images/pieces/Yellow_N.png"
      }
    }
  };

  // the model!
  var Piece = Backbone.Model.extend({
    defaults: {
      color: 'black',
      x: 0,
      y: 0,
      movesDiagonally: true,
      movesForwardAndBack: true,
      movesLeftAndRight: true,
      movementLimit: 7,
      type: 'pawn',
      img_src: typeAttributes['pawn'].img_src['black']

    },
    initialize: function(options){
      //options expects: 
      // options.x, options.y, options.type, options.color
      this.x = options.x;
      this.y = options.y;
      this.type = options.type;
      this.color = options.color;
      this.movesDiagonally = typeAttributes[this.type].movesDiagonally;
      this.movementLimit = typeAttributes[this.type].movementLimit;
      this.img_src = typeAttributes[this.type].img_src[this.color];
    },

    setPos: function(x,y){
      this.x = x || this.x;
      this.y = y || this.y;
      //trigger movement?
    },

    getPos: function(){
      return {'x':this.x, 'y':this.y};
    },

    moveTo: function(x,y){
      if(this.isValidMove(x,y)){
       this.setPos(x,y);
       return true;
      }
      return false;
    },

    isValidMove: function(x,y){
      var okayMoves = this.canMoveTo();
      if(okayMoves[y][x]){return true;}
      return false;
    },

    makeBlankBoard : function(){
      var board = [];
      for (var i = 0; i < 8; i++) {
        board.push([]);
        for (var j = 0; j < 8; j++) {
          board[i].push(false); 
        };
      };
      return board;
    },

    canMoveTo: function(){
      var board = Piece.makeBlankBoard();

      for (var i = -this.movementLimit; i <= this.movementLimit; i++) {

        // foward and backward movements
        // first check that the square is on the board
        if(this.movesForwardAndBack && this.y+i >= 0 && this.y+i <= 7){ 
          board[this.y+i][this.x] = true;
        }
        // right and left movements
        // first check that the square is on the board
        if(this.movesLeftAndRight && this.x+i >= 0 && this.x+i <= 7){ 
          board[this.y][this.x+i] = true;
        }
        // diagonal movements
        // first check that the square is on the board
        if(this.movesDiagonally && this.y+i >= 0 && this.y+i <= 7 && this.x+i >= 0 && this.x+i <= 7){ 
          board[this.y+i][this.x+i] = true;
        }
        // diagonal movements
        // first check that the square is on the board
        if(this.movesDiagonally && this.y-i >= 0 && this.y-i <= 7 && this.x+i >= 0 && this.x+i <= 7){ 
          board[this.y-i][this.x+i] = true;
        }
      };

      return board;
    }

  });

  return Piece
});

