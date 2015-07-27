var Vector = function(dx, x, dy, y) {
  Position.call(this, x, y);
  this.dx = dx;
  this.dy = dy;
};

Vector.prototype = Object.create(Position.prototype);

Vector.prototype.equals = function(vector) {
  return this.x === vector.x &&
         this.y === vector.y &&
         this.dy === vector.dy &&
         this.dx === vector.dx;
};

Vector.move = function(position, dx, dy) {
  return new Vector(dx, position.x + dx, dy, position.y + dy);
};