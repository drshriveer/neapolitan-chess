var King = function(board, player, position) {
  Piece.apply(this, arguments);
};

King.prototype = Object.create(Piece.prototype);
King.prototype.constructor = King;

/*** @Override */
King.prototype._movementRules = new MovementRules(1, true, true, true);
King.prototype._type = Pieces.KING;
King.prototype._threatType = Threats.NONE;

/*** @Override */
King.prototype.getImgUrl = function() {
  return "/images/pieces/" + this.player.getColor() + "_K.png";
};

/*** @Override */
King.prototype.threats = function() {
  return [];
};
