var Queen = function(board, player, position) {
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
  return "/images/pieces/" + this.player.getColor() + "_Q.png";
};

/*** @Override */
Queen.prototype.threats = function(board) {
  if (this.paralized) return [];

  // sorry for the confusion; these are 'backwards' vectors
  var potentialAttacks = [
      Vector.move(this.position, Direction.NONE, Direction.N),
      Vector.move(this.position, Direction.E,    Direction.NONE),
      Vector.move(this.position, Direction.NONE, Direction.S),
      Vector.move(this.position, Direction.W,    Direction.NONE),
      Vector.move(this.position, Direction.W,    Direction.N),
      Vector.move(this.position, Direction.W,    Direction.S),
      Vector.move(this.position, Direction.E,    Direction.N),
      Vector.move(this.position, Direction.E,    Direction.S)];

  var result = [];

  // TODO: TEST THIS MOAR
  //       it is possible that the vectors are the reverse directions
  for(var i = 0; i < potentialAttacks.length; i++) {
    var attackVector = potentialAttacks[i];
    if (attackVector.isOffBoard()) continue;
    var attackPiece = this.board.getPiece(attackVector);
    if (attackPiece == null) continue;
    var reverseVector = Vector.move(this.position,
        -attackVector.dx, -attackVector.dy);
    if (reverseVector.isOffBoard()) continue;
    var reverseDirectionPiece = this.board.getPiece(reverseVector);
    var reverseDirectionThreats = this.board.getThreats(reverseVector);
    if (reverseDirectionPiece == null &&
        !this.player.equals(attackPiece.getPlayer())) {
      result.push(attackVector);
    }
  }

  return result;
};
