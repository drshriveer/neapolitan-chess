var Jumper = function(board, player, position) {
  Piece.apply(this, arguments);
};

Jumper.prototype = Object.create(Piece.prototype);
Jumper.prototype.constructor = Jumper;

/*** @Override */
Jumper.prototype._type = Pieces.JUMPER;
Jumper.prototype._threatType = Threats.ATTACK;

/*** @Override */
Jumper.prototype.getImgUrl = function() {
  return "/images/pieces/" + this.player.getColor() + "_N.png"; //FIXME
};

/*** @Override */
Jumper.prototype.canMoveTo = function() {
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
Jumper.prototype.threats = function(isChameleon) {
  if (this.paralyzed) return [];
  isChameleon = (isChameleon == null) ? false : true;

  var potentialAttacks = this.movementVectors();

  var result = [];
  for (var key in potentialAttacks) {
    var vector = potentialAttacks[key];
    for (var i = 0; i < vector.length; i++) {
      var position = vector[i];
      var piece = this.game.getPiece(position);
      var threats = this.game.getThreats(position);
      if (piece == null &&
          (threats.contains(Threats.TRAP) ||
          threats.contains(Threats.PARALYSIS))) {
        break;
      } else if (piece != null &&
          !piece.getPlayer().equals(this.player)) {
        if (isChameleon &&
            !piece.isType(Pieces.JUMPER)) continue;
        var nextPosition = vector[i+1];
        if (nextPosition == null) break;
        var nextPiece = this.game.getPiece(nextPosition);
        if (nextPiece == null) {
          result.push(position);
        }
        break;
      } else if (piece != null) {
        break;
      }
    }
  }

  return result;
};
