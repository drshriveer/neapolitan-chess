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

  // CAN OVERRIDE
  canMoveTo: function() {
    var vectors = this.movementVectors();
    var result = [];
    for (var key in vectors) {
      var vector = vectors[key];
      for (var i = 0; i < vector.length; i++) {
        var position = vector[i];
        var piece = this.game.getPiece(position);
        var threats = this.game.getThreats(position);
        if ( (piece !== null &&
             position.equals(piece.getPosition())) ||
            this.threats().contains(Threats.BLOCKING_TRAP)) {
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
    if (this.movementRules == null) {
      throw "movement rules are null";
    }
    var vectors = {};

    if (this.movementRules.northSouth) {
      // add north vector
      vectors.N = this.singleVector(
          Direction.NONE, Direction.N, this.movementRules.limit);
      // add south vector
      vectors.S = this.singleVector(
          Direction.NONE, Direction.S, this.movementRules.limit);
    }
    if (this.movementRules.eastWest) {
      // add east vector
      vectors.E = this.singleVector(
          Direction.E, Direction.NONE, this.movementRules.limit);
      // add west vector
      vectors.W = this.singleVector(
          Direction.W, Direction.NONE, this.movementRules.limit);
    }
    if (this.movementRules.diagonal) {
      // add NW vector
      vectors.NW = this.singleVector(
          Direction.W, Direction.N, this.movementRules.limit);
      // add NE vector
      vectors.NE = this.singleVector(
          Direction.E, Direction.N, this.movementRules.limit);
      // add SW vector
      vectors.SW = this.singleVector(
          Direction.W, Direction.S, this.movementRules.limit);
      // add SE vector
      vectors.SE = this.singleVector(
          Direction.E, Direction.S, this.movementRules.limit);
    }
    return vectors;
  },

  singleVector: function(dx, dy, limit) {
    var result = [];
      for (var i = 1; i <= limit; i++) {
        var vector = new Vector(
            dx, this.vector.x - i * dx,
            dy, this.vector.y - i * dy);
        if (vector.isOffgame()) break;
        result.push(vector);
      }
    return result;
  },

  toString: function() {
    return "["+this._type+"|P"+this.player.getNumber() +"]";
  }

};