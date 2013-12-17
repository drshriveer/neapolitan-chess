// the prototype of all pieces:
var Piece = function(x,y){
  this.x = x || 0;
  this.y = y || 0;
  this.movesDiagonally = true;
  this.movesForwardAndBack = true;
  this.movesLeftAndRight = true;
  this.movementLimit = 7; //two spaces
};

Piece.prototype.setPos = function(x,y){
  this.x = x || this.x;
  this.y = y || this.y;
  //trigger movement?
};

Piece.prototype.getPos = function(){
  return {'x':this.x, 'y':this.y};
};

Piece.prototype.moveTo = function(x,y){
  if(this.isValidMove(x,y)){
   this.setPos(x,y);
   return true;
  }
  return false;
};

Piece.prototype.isValidMove = function(x,y){
  var okayMoves = canMoveTo();
  if(okayMoves[y][x]){ return true;}
  return false;
};

Piece.prototype._makeBlankBoard = function(){
  var board = [];
  for (var i = 0; i < 8; i++) {
    board.push([]);
    for (var j = 0; j < 8; j++) {
      board[i].push(false); 
    };
  };
  return board;
}

Piece.prototype.canMoveTo = function(board){
  var board = this._makeBlankBoard();

  for (var i = -this.movementLimit; i <= this.movementLimit; i++) {
    // foward and backward movements
    // first check that the square is on the board
    if(this.movesFowardAndBack && this.movesboard[this.y+i][this.x] === false){ 
      board[this.y+i][this.x] = true;
    }
    // right and left movements
    // first check that the square is on the board
    if(this.movesLeftAndRight && board[this.y][this.x+i] === false){ 
      board[this.y][this.x+i] = true;
    }
    // diagonal movements
    // first check that the square is on the board
    if(this.movesDiagonally && board[this.y+i][this.x+i] === false){ 
      board[this.y+i][this.x+i] = true;
    }
    // diagonal movements
    // first check that the square is on the board
    if(this.movesDiagonally && board[this.y-i][this.x+i] === false){ 
      board[this.y-i][this.x+i] = true;
    }
  };

  return board;
};





//
// PAWNS
//
var Pawn = new Piece();
Pawn.prototype.constructor = function(x,y){
  this.x = x;
  this.y = y;
  this.movesDiagonally = false;
  this.movementLimit = 2;
  this.img_src = {
    black: "images/pieces/Black_P.png",
    blue: "images/pieces/Blue_P.png",
    brown: "images/pieces/Brown_P.png",
    clear: "images/pieces/Clear_white_P.png",
    white: "images/pieces/White_P.png",
    yellow: "images/pieces/Yellow_P.png",
  };
};

//
// PARALYZER
//
var Paralyzer = new Piece();
Paralyzer.prototype.constructor = function(x,y){
  this.x = x;
  this.y = y;
  this.movesDiagonally = false;
  this.img_src = {
    black: "images/pieces/Black_UR.png",
    blue: "images/pieces/Blue_UR.png",
    brown: "images/pieces/Brown_UR.png",
    clear: "images/pieces/Clear_white_UR.png",
    white: "images/pieces/White_UR.png",
    yellow: "images/pieces/Yellow_UR.png",
  };
};

//
// CHAMELEON
//
var Chameleon = new Piece();
Chameleon.prototype.constructor = function(x,y){
  this.x = x;
  this.y = y;
  this.img_src = {
    black: "images/pieces/Black_B.png",
    blue: "images/pieces/Blue_B.png",
    brown: "images/pieces/Brown_B.png",
    clear: "images/pieces/Clear_white_B.png",
    white: "images/pieces/White_B.png",
    yellow: "images/pieces/Yellow_B.png",
  };
};

//
// RETRACTOR
//
var Retractor = new Piece();
Retractor.prototype.constructor = function(x,y){
  this.x = x;
  this.y = y;
  this.img_src = {
    black: "images/pieces/Black_Q.png",
    blue: "images/pieces/Blue_Q.png",
    brown: "images/pieces/Brown_Q.png",
    clear: "images/pieces/Clear_white_Q.png",
    white: "images/pieces/White_Q.png",
    yellow: "images/pieces/Yellow_Q.png",
  };
};

//
// KING
//
var King = new Piece();
King.prototype.constructor = function(x,y){
  this.x = x;
  this.y = y;
  this.movementLimit = 1;
  this.img_src = {
    black: "images/pieces/Black_K.png",
    blue: "images/pieces/Blue_K.png",
    brown: "images/pieces/Brown_K.png",
    clear: "images/pieces/Clear_white_K.png",
    white: "images/pieces/White_K.png",
    yellow: "images/pieces/Yellow_K.png",
  };
};

//
// SYNCHRONIZER
//
var Synchronizer = new Piece();
Synchronizer.prototype.constructor = function(x,y){
  this.x = x;
  this.y = y;
  this.movementLimit = 1;
  this.img_src = {
    black: "images/pieces/Black_R.png",
    blue: "images/pieces/Blue_R.png",
    brown: "images/pieces/Brown_R.png",
    clear: "images/pieces/Clear_white_R.png",
    white: "images/pieces/White_R.png",
    yellow: "images/pieces/Yellow_R.png",
  };
};