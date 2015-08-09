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
  this.pieces = this.pieces.concat(this.newPieces(player1));
  this.pieces = this.pieces.concat(this.newPieces(player2));
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
        piece.getPlayer().equals(player);
  });
};

Game.prototype.getParalyzed = function() {
  // pieces.findWhere({paralyzed: true});
  // return type requested
};

Game.prototype.getPiece = function(position) {
  if (position == null) return;
  return this.board[position.y][position.x];
};

Game.prototype.getThreats = function(position) {
  var result = this.threats[position.y][position.x];
  return (result != null) ? result : [];
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

Game.prototype.newPieces = function(player) {
  var result = [];
  var row = (player.getNumber() == 1) ?
      CLOSE_ROW_START : FAR_ROW_START;

  // add pawns
  for (var i = 0; i < BOARD_SIZE; i++) {
    result.push(new Pawn(this,
        player, new Position(i, row)));
  }
  // move to next row...
  (player.getNumber() === 1) ? row++ : row--;

  // TODO: uncomment
  result.push(new Paralyzer(this,
      player, new Position(0, row)));
  result.push(new Jumper(this,
      player, new Position(1, row)));
  // result.push(new Chameleon(this,
  //     player, new Position(2, row)));
  result.push(new Retractor(this,
      player, new Position(3, row)));
  result.push(new King(this,
      player, new Position(4, row)));
  // result.push(new Chameleon(this,
  //     player, new Position(5, row)));
  result.push(new Jumper(this,
      player, new Position(6, row)));
  result.push(new Synchronizer(this,
      player, new Position(7, row)));

  // remove this:
  result.push(new Jumper(this,
    player, new Position(2, 4)));


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