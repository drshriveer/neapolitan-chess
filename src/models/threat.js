var Threat = function(user, type, vectors) {
  this._user = user;
  this._threatType = type;
  this._vectors = vectors;
};

Threat.prototype.getUser = function() {
  return this._user;
};

Threat.prototype.getThreatType = function() {
  return this._threatType;
};

Threat.prototype.getVectors = function() {
  return this._vectors;
};