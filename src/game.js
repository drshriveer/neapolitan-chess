/**
* TODO:
* 1) account for moving into a blocking trap if the object is a
*    sacrificing move;
* 2) after each move, reset paralysis;
* 3)
*/

Game = function(palyer1, player2) {
  this._id = this.idGenerator();
  this.board = this.emptyBoard();
  this.threats = this.emptyBoard();
  this.pieces = this.newPieces(palyer1, player2);
  this.placePieces();
  Events.call(this);
};

mixin(Game.prototype, Events.prototype);

Game.prototype.movePiece = function(piece, vector) {
  // if piece.isParalyzed() alert("cannot move here")
  // if piece === paralyzer reset paralysis
  // move piece
  // re-calculate threats
};

Game.prototype.getUserPiece = function(user, pieceType) {
  // pieces.findWhere({user: user, _type: pieceType});
  // return type requested
};

Game.prototype.getParalyzed = function() {
  // pieces.findWhere({paralyzed: true});
  // return type requested
};

Game.prototype.getPiece = function(position) {
  return this.board[position.y][position.x];
};

Game.prototype.getThreats = function(position) {
  return this.threats[position.y][position.x];
};

Game.prototype.idGenerator = function() {
  var _currentId = 0;
  return function() {
    return _currentId++;
    };
  }();

Game.prototype.emptyBoard = function(){
  var board = [];
  for(var i = 0; i < 7; i++) {
    var row = [];
    for(var j = 0; j < 7; j++) {
      row.push(null);
    }
    board.push(row);
  }
  return board;
};

Game.prototype.newPieces = function(player1, player2) {
  var result = [];
  // add pawns
  for (var i = 0; i < 7; i++) {
    result.push(new Pawn(this,
        player1, new Position(i, 1)));
    result.push(new Pawn(this,
        player2, new Position(i, 5)));
  }
  // TODO: add others  `1
  result.push(new Queen(this,
      player1, new Position(3, 0)));
  result.push(new Queen(this,
      player2, new Position(3, 6)));

  result.push(new Paralyzer(this,
      player1, new Position(0, 0)));
  result.push(new Paralyzer(this,
      player2, new Position(0, 6)));

  return result;
};

Game.prototype.placePieces = function() {
  for (var i = 0; i < this.pieces.length; i++) {
    this.placePiece(this.pieces[i]);
  }
};

Game.prototype.placePiece = function(piece) {
  var position = piece.getPosition();
  if (this.getPiece(position) != null) {
    return console.error("Piece already exists here! ", position);
  }
  this.board[position.y][position.x] = piece;
};

Game.prototype.printBoard = function() {
  var result = "";
  // This is a stupid function. Need to make it smarter
  for (var i = 0; i < this.board.length; i++) {
    var row = this.board[i];
    var rowString = "";
    for (var j = 0; j < row.length; j++) {
      rowString += (row[j] == null) ? "[________]" : row[j];
      rowString += "\t\t";
    }
    result += rowString + "\n";
  }
  return  result;
};

Game.prototype.toString = function() {
  return "Game-" + this._id;
};