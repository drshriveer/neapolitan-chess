var Chameleon = function(game, player, position) {
  Piece.apply(this, arguments);
};

Chameleon.prototype = Object.create(Piece.prototype);
Chameleon.prototype.constructor = Chameleon;

/*** @Override */
Chameleon.prototype._type = Pieces.CHAMELEON;
Chameleon.prototype._threatType = Threats.ATTACK;

/*** @Override */
Chameleon.prototype.getImgUrl = function() {
  return "/images/pieces/" + this.player.getColor() + "_N.png"; //FIXME
};

/*** @Override */
Chameleon.prototype.canMoveTo = function() {
  var vectors = this.movementVectors();
  var result = [];
  for (var key in vectors) {
    var vector = vectors[key];
    for (var i = 0; i < vector.length; i++) {
      var position = vector[i];
      var piece = this.game.getPiece(position);
      var threats = this.game.getThreats(position);
      if (piece == null &&
          (threats.contains(Threats.TRAP) ||
          threats.contains(Threats.PARALYSIS))) {
        result.push(position);
        break;
      } else if (piece != null &&
          piece.getType() == Pieces.JUMPER &&
          !piece.getPlayer().equals(this.player)) {
        var nextPosition = vector[i+1];
        if (nextPosition == null) break;
        var nextPiece = this.game.getPiece(nextPosition);
        if (nextPiece == null) {
          result.push(nextPosition);
        }
        break;
      } else if (piece != null) {
        break;
      }
      result.push(position);
    }
  }
  return result;
};

/*** @Override */
Chameleon.prototype.threats = function() {

  var result = this.makeThreatResult();

  result.REVENGE = Retractor.prototype.threats.call(this, true);
  result.ATTACK = Jumper.prototype.threats.call(this, true);
  result.PARALYSIS = Paralyzer.prototype.threats.call(this, true);
  result.ASSASSINATION = Synchronizer.prototype.threats.call(this, true);
  result.TRAP = Pawn.prototype.threats.call(this, true);

  return result;
};
