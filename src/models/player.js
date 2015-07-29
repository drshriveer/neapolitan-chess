var Player = function(number, username, color){
  if (number !== 1 && number !== 2) throw "invalid player number";
  this._number = number;
  this._username = username;
  this._color = color;
};

Player.prototype.equals = function(player) {
  return this._number === player._number &&
        this._username === player._username &&
        this._color === player._color;
};

Player.prototype.isPlayerTurn = function(turn) {
  var mod = turn % 2;
  if ((mod === 1 && this._number === 1) ||
      (mod === 0 && this._number === 2)) {
    return true;
  }
  return false;
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
