Game = function(palyer1, player2) {
  this._id = this.idGenerator();
  this.board = this.emptyBoard();
  this.threats = this.emptyBoard();
  this.pieces = this.newPieces(palyer1, player2);
  this.placePieces();
  Events.call(this);
};

mixin(Game.prototype, Events.prototype);

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
    return console.error("Piece already exists here!");
  }
  this.board[position.y][position.x] = piece;
};

Game.prototype.getPiece = function(position) {
  return this.board[position.y][position.x];
};

Game.prototype.getThreats = function(position) {
  return this.threats[position.y][position.x];
};

Game.prototype.printBoard = function() {
  var result = "";
  for (var i = 0; i < this.board.length; i++) {
    result += this.board[i].join("\t") + "\n\n\n";
  }
  return  result;
};

Game.prototype.toString = function() {
  return "Game-" + this.id;
};