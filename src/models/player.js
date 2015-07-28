var Player = function(num, username, color){
  this._number = 1;
  this._username = username;
  this._color = color;
};

Player.prototype.equals = function(player) {
  return this._number === player._number &&
        this._username === player._username &&
        this._color === player._color;
};

Player.prototype.getNumber = function() {
  return this._number;
};

Player.prototype.getColor = function() {
  return this._color;
};

Player.prototype.getUsername = function() {
  return this._username;
};

Player.prototype.toString = function() {
  return "P" + this._number +
        ":" + this._username +
        ":" + this._color;
};
