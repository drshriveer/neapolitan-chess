var Position = function(x, y) {
  this.x = x;
  this.y = y;
};

Position.prototype.clone = function() {
  return new Position(this.x, this.y);
};

Position.prototype.move = function(dx, dy) {
  return new Position(this.x + dx, this.y + dy);
};

Position.prototype.equals = function(position) {
  return this.x === position.x &&
      this.y === position.y;
};

Position.prototype.isOffBoard = function(position) {
  return this.x < 0 || this.y < 0 ||
      this.x > BOARD_SIZE || this.y > BOARD_SIZE;
};
