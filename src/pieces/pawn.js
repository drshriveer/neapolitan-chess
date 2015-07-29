var Pawn = function(board, player, position) {
  Piece.apply(this, arguments);
  this.movementRules = new MovementRules(2, true, true, false);

};
Pawn.prototype = Object.create(Piece.prototype);
Pawn.prototype.constructor = Pawn;

/*** @Override */
Pawn.prototype._type = Pieces.PAWN;
Pawn.prototype._threatType = Threats.TRAP;

/*** @Override */
Pawn.prototype.getImgUrl = function() {
  return "/images/pieces/" + this.player.getColor() + "_P.png";
};

/*** @Override */
Pawn.prototype.threats = function(board) {
  var attackPartners = [
      new Vector(Direction.E, this.position.x+2, Direction.NONE, this.position.y),
      new Vector(Direction.W, this.position.x-2, Direction.NONE, this.position.y),
      new Vector(Direction.NONE, this.position.x, Direction.S, this.position.y+2),
      new Vector(Direction.NONE, this.position.x, Direction.N, this.position.y-2) ];

  var result = [];

  for(var i = 0; i < attackPartners.length; i++) {
    var vector = attackPartners[i];
    if (vector.isOffBoard()) continue;
    var piece = this.board.getPiece(vector);
    if (piece == null) continue;
    if (this.getType() === piece.getType() &&
        this.player.equals(piece.getPlayer())) {
      var pos  = new Position(vector.x - vector.dx, vector.y - vector.dy);
      if (this.board.getPiece(pos) != null) continue;
      result.push(pos);
    }
  }
  return result;
};
