/**
* TODO:
* 1) account for moving into a blocking trap if the object is a
*    sacrificing move;
* 2) after each move, reset paralysis;
* 3)
*/

Game = function(player1, player2) {
  this.board = this.emptyBoard();
  this.threats = this.emptyBoard();
  this.pieces = [];
  this.pieces = this.pieces.concat(this.newPieces(player1, CLOSE_ROW_START));
  this.pieces = this.pieces.concat(this.newPieces(player2, FAR_ROW_START));
  this.placePieces();
  this.turn = 1;
  Events.call(this);
};

mixin(Game.prototype, Events.prototype);

Game.prototype.movePiece = function(player, piece, vector) {
  if (!player.isPlayerTurn(turn)) {
    return "It's not your turn to move.";
  }
  if (piece.isParalyzed()) {
    return "This piece is paralyzed.";
  }
  this.resetParalasys();
  // move piece
  // re-calculate threats
  this.turn++;
  return "moved";
};

Game.prototype.resetParalasys = function() {
  this.pieces.forEach(function(piece){
    piece.setParalysis(false);
  });
};

Game.prototype.getPlayerPiece = function(player, pieceType) {
  // pieces.findWhere({user: user, _type: pieceType});
  return this.pieces.filter(function(piece) {
    return piece.getType() === pieceType &&
        piece.getPlayer.equals(player);
  });
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
  for(var i = 0; i < BOARD_SIZE; i++) {
    var row = [];
    for(var j = 0; j < BOARD_SIZE; j++) {
      row.push(null);
    }
    board.push(row);
  }
  return board;
};

Game.prototype.newPieces = function(player, startRow) {
  if (startRow !== CLOSE_ROW_START &&
      startRow !== FAR_ROW_START) throw "Not a valid start row";
  var result = [];
  // add pawns
  for (var i = 0; i < BOARD_SIZE; i++) {
    result.push(new Pawn(this,
        player, new Position(i, startRow + 1)));
  }

  // TODO: uncomment
  result.push(new Paralyzer(this,
      player, new Position(0, startRow)));
  // result.push(new Jumper(this,
  //     player, new Position(1, startRow)));
  // result.push(new Chameleon(this,
  //     player, new Position(2, startRow)));
  result.push(new Retractor(this,
      player, new Position(3, startRow)));
  // result.push(new King(this,
  //     player, new Position(4, startRow)));
  // result.push(new Chameleon(this,
  //     player, new Position(5, startRow)));
  // result.push(new Jumper(this,
  //     player, new Position(6, startRow)));
  result.push(new Synchronizer(this,
      player, new Position(7, startRow)));

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
  return "Game";
};