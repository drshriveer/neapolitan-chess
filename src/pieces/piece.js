// a basic piece
var Piece = function(game, player, position) {
  this._id = game.idGenerator();
  this.game = game;
  this.player = player;
  this.paralyzed = false;
  this.position = position.clone();
  Events.call(this);
};

mixin(Piece.prototype, Events.prototype);

Piece.prototype = {

  // CAN Override
  _movementRules: new MovementRules(8, true, true, true),

  // MUST OVERRIDE
  _type: "none",
  _threatType: "none",

  // MUST OVERRIDE
  getImgUrl: function() {
    throw "You must override 'getImgUrl' method";
  },

  // MUST OVERRIDE
  threats: function() {
    throw "You must override 'threats' method";
  },

  // CAN OVERRIDE (jumper})
  canMoveTo: function() {
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
        } else if (piece != null) {
          break;
        }
        result.push(position);
      }
    }
    return result;
  },

  isParalyzed: function() {
    return this.paralyzed;
  },

  isType: function(pieceType) {
    return this._type === pieceType;
  },

  setParalyzed: function(paralyzed) {
    this.paralyzed = paralyzed;
  },

  getPosition: function() {
    return this.position.clone();
  },

  setPosition: function(position) {
    this.position = position.clone();
  },

  getPlayer: function() {
    return this.player;
  },

  getThreatType: function() {
    return this._threatType;
  },

  getType: function() {
    return this._type;
  },

  /**
   * Provides possible movement vectors based on
   * moment rules assuming an empty game. Movement
   * blocks due to traps or pieces should be done
   * in the canMoveTo function.
   */
  movementVectors: function() {
    if (this._movementRules == null) {
      throw "movement rules are null";
    }
    var vectors = {};

    if (this._movementRules.northSouth) {
      // add north vector
      vectors.N = this.singleVector(
          Direction.NONE, Direction.N, this._movementRules.limit);
      // add south vector
      vectors.S = this.singleVector(
          Direction.NONE, Direction.S, this._movementRules.limit);
    }
    if (this._movementRules.eastWest) {
      // add east vector
      vectors.E = this.singleVector(
          Direction.E, Direction.NONE, this._movementRules.limit);
      // add west vector
      vectors.W = this.singleVector(
          Direction.W, Direction.NONE, this._movementRules.limit);
    }
    if (this._movementRules.diagonal) {
      // add NW vector
      vectors.NW = this.singleVector(
          Direction.W, Direction.N, this._movementRules.limit);
      // add NE vector
      vectors.NE = this.singleVector(
          Direction.E, Direction.N, this._movementRules.limit);
      // add SW vector
      vectors.SW = this.singleVector(
          Direction.W, Direction.S, this._movementRules.limit);
      // add SE vector
      vectors.SE = this.singleVector(
          Direction.E, Direction.S, this._movementRules.limit);
    }
    return vectors;
  },

  singleVector: function(dx, dy, limit) {
    var result = [];
      for (var i = 1; i <= limit; i++) {
        var vector = new Vector(
            dx, this.position.x - i * dx,
            dy, this.position.y - i * dy);
        if (vector.isOffBoard()) break;
        result.push(vector);
      }
    return result;
  },

  toString: function() {
    return "["+this._type.substring(0,4)+"|P"+this.player.getNumber() +"]";
  },

  makeThreatResult: function() {
    var result = {};
    for (var threat in Threats) {
      result[threat] = [];
    }
    return result;
  }

};