var Paralyzer = function(board, player, position) {
  Piece.apply(this, arguments);
  this.movementRules = new MovementRules(7, true, true, true);
};

Paralyzer.prototype = Object.create(Piece.prototype);
Paralyzer.prototype.constructor = Paralyzer;

/*** @Override */
Paralyzer.prototype._type = Pieces.PARALYZER;
Paralyzer.prototype._threatType = Threats.PARALYSIS;

/*** @Override */
Paralyzer.prototype.getImgUrl = function() {
  return "/images/pieces/" + this.player.getColor() + "_UR.png";
};

/*** @Override */
Paralyzer.prototype.threats = function(board) {
  if (this.paralized) return [];
  var potentialParalysis = [
      Vector.move(this.position, Direction.NONE, Direction.N),
      Vector.move(this.position, Direction.E,    Direction.NONE),
      Vector.move(this.position, Direction.NONE, Direction.S),
      Vector.move(this.position, Direction.W,    Direction.NONE),
      Vector.move(this.position, Direction.W,    Direction.N),
      Vector.move(this.position, Direction.W,    Direction.S),
      Vector.move(this.position, Direction.E,    Direction.N),
      Vector.move(this.position, Direction.E,    Direction.S)];

  var result = [];

  for(var i = 0; i < potentialParalysis.length; i++) {
    var vector = potentialParalysis[i];
    if (vector.isOffBoard()) continue;
    var piece = this.board.getPiece(vector);
    if (piece == null) {
      result.push(vector);
    } else if (!this.player.equals(piece.getPlayer())) {
      piece.setParalyzed(true);
      result.push(vector);
    } // else its our piece; no threats
  }

  return result;
};
