var Synchronizer = function(game, player, position) {
  Piece.apply(this, arguments);
};

Synchronizer.prototype = Object.create(Piece.prototype);
Synchronizer.prototype.constructor = Synchronizer;

/*** @Override */
Synchronizer.prototype._type = Pieces.SYNCHRONIZER;
Synchronizer.prototype._threatType = Threats.ASSASINATE;

/*** @Override */
Synchronizer.prototype.getImgUrl = function() {
  return "/images/pieces/" + this.player.getColor() + "_R.png";
};

/*** @Override */
Synchronizer.prototype.threats = function(isChameleon) {
  isChameleon = (isChameleon == null) ? false : true;
  var king = this.game.getPlayerPiece(
      this.player, Pieces.KING)[0];

  if (king == null) throw "Cannot play without a king.";

  var potentialAttacks = [
    new Vector(Direction.NONE, this.position.x,
              Direction.NONE, king.position.y),
    new Vector(Direction.NONE, king.position.x,
              Direction.NONE, this.position.y),
  ];

  var result = [];
  for(var i = 0; i < potentialAttacks.length; i++) {
    var vector = potentialAttacks[i];
    if (vector.isOffBoard()) continue;
    var piece = this.game.getPiece(vector);
    if (piece == null) {
      if (isChameleon) continue;
    } else if (this.player.equals(piece.getPlayer())) {
      continue;
    } else if (isChameleon &&
        !piece.isType(Pieces.SYNCHRONIZER)) {
      continue;
    }
    result.push(vector);
  }
  return result;
 };
