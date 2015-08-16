var Retractor = function(game, player, position) {
  Piece.apply(this, arguments);
};

Retractor.prototype = Object.create(Piece.prototype);
Retractor.prototype.constructor = Retractor;

/*** @Override */
Retractor.prototype._type = Pieces.RETRACTOR;
Retractor.prototype._threatType = Threats.REVENGE;

/*** @Override */
Retractor.prototype.getImgUrl = function() {
  return "/images/pieces/" + this.player.getColor() + "_Q.png";
};

/*** @Override */
Retractor.prototype.threats = function(isChameleon) {
  isChameleon = (isChameleon == null) ? false : true;
  if (this.paralyzed) return [];

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
    var attackPiece = this.game.getPiece(attackVector);
    if (attackPiece == null ||
        this.player.equals(attackPiece.getPlayer())) continue;
    if (isChameleon &&
        !attackPiece.isType(Pieces.RETRACTOR)) continue;
    var reverseVector = Vector.move(this.position,
        -attackVector.dx, -attackVector.dy);
    if (reverseVector.isOffBoard()) continue;
    var reverseDirectionPiece = this.game.getPiece(reverseVector);
    var reverseDirectionThreats = this.game.getThreats(reverseVector);
    if (reverseDirectionPiece == null) {
      result.push(attackVector);
    }
  }

  return result;
};
