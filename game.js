Game = function(player1color, player2color) {
  this._id = this.idGenerator();
  this.board = this.emptyBoard();
  this.threats = this.emptyBoard();
  this.pieces = this.newPieces(player1color,
      player2color);
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

Game.prototype.newPieces = function(player1color, player2color) {
  var result = [];
  // add pawns
  for (var i = 0; i < 7; i++) {
    result.push(new Pawn(this,
        player1color, 1, new Position(i, 1)));
    result.push(new Pawn(this,
        player2color, 2, new Position(i, 5)));
  }
  // TODO add others  `1
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
    result += this.board[i].join("\t") + "\n";
  }
  return  result;
};

Game.prototype.toString = function() {
  return "Game-" + this.id;
};