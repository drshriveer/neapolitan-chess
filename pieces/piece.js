// a basic piece
var Piece = function(board, player, position) {
  this._id = board.idGenerator();
  this.board = board;
  this.player = player;
  this.paralized = false;
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
    console.error("You must override 'getImgUrl' method");
  },

  // MUST OVERRIDE
  threats: function() {
    console.error("You must override 'threats' method");
  },

  // CAN OVERRIDE
  canMoveTo: function() {
    var vectors = this.movementVectors();
    var result = [];
    for (var key in vectors) {
      var vector = vectors[key];
      for (var i = 0; i < vector.length; i++) {
        var position = vector[i];
        var piece = this.board.getPiece(position);
        var threats = this.board.getThreats(position);
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

  isParalized: function() {
    return paralized;
  },

  setParalized: function(paralized) {
    this.paralized = paralized;
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
   * moment rules assuming an empty board. Movement
   * blocks due to traps or pieces should be done
   * in the canMoveTo function.
   */
  movementVectors: function() {
    if (this.movementRules == null) {
      return console.error("movement rules are null");
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

  singleVector: function(xDirection, yDirection, limit) {
    var result = [];
      for (var i = 1; i <= limit; i++) {
        var position = new Position(
            this.position.x - i * xDirection,
            this.position.y - i * yDirection);
        if (position.isOffBoard()) break;
        result.push(position);
      }
    return result;
  },

  toString: function() {
    return "["+this._type+"|"+this.player +"]";
  }

};