var Queen = function(board, color, player, position) {
  Piece.apply(this, arguments);
  this.movementRules = new MovementRules(7, true, true, true);
};

Queen.prototype = Object.create(Piece.prototype);
Queen.prototype.constructor = Queen;

/*** @Override */
Queen.prototype._type = "queen";
Queen.prototype._threatType = Threats.ASSASINATE;

/*** @Override */
Queen.prototype.getImgUrl = function() {
  return "/images/pieces/" + this.color + "_Q.png";
};

/*** @Override */
Queen.prototype.threats = function(board) {
  var potentialAttacks = [
      Vector.move(this.position, Direction.NONE, Direction.N),
      Vector.move(this.position, Direction.NONE, Direction.S),
      Vector.move(this.position, Direction.W,    Direction.NONE),
      Vector.move(this.position, Direction.W,    Direction.N),
      Vector.move(this.position, Direction.W,    Direction.S),
      Vector.move(this.position, Direction.E,    Direction.NONE),
      Vector.move(this.position, Direction.E,    Direction.N),
      Vector.move(this.position, Direction.E,    Direction.W)];

  var result = [];


  // for(var i = 0; i < attackPartners.length; i++) {
  //   var vector = attackPartners[i];
  //   if (vector.isOffBoard()) continue;
  //   var piece = this.board.getPiece(vector);
  //   if (piece == null) continue;
  //   if (this._type === piece.getType() &&
  //       this.player === piece.getPlayer()) {
  //     var pos  = new Position(vector.x - vector.dx, vector.y - vector.dy);
  //     if (this.board.getPiece(pos) != null) continue;
  //     result.push(pos);
  //   }
  // }
  return result;
};
