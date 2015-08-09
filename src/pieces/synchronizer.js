var Synchronizer = function(board, player, position) {
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
Synchronizer.prototype.threats = function() {
  var king = this.game.getPlayerPiece(
      this.player, Pieces.KING)[0];

  if (king == null) throw "Cannot play without a king.";

  if(this.position.x === king.position.x ||
      this.position.y === king.position.y) return [];

  return [
    new Vector(Direction.NONE, this.position.x,
              Direction.NONE, king.position.y),
    new Vector(Direction.NONE, king.position.x,
              Direction.NONE, this.position.y),
  ];
};
