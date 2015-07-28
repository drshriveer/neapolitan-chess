var MovementRules = function(limit, northSouth, eastWest, diagonal) {
  this.limit = limit || 7;
  this.northSouth = northSouth || false;
  this.eastWest = eastWest || false;
  this.diagonal = diagonal || false;
};

