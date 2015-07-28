var Events = function() {
  this._events = {
    // eventName => {method+Context => function}
  };
};

Events.prototype.on = function(eventName, method, context) {
  var args = Array.prototype.slice.call(arguments, 3);
  var triggerSignature = this.formatTriggerSig(method, context);
  var triggers = this._events[eventName];
  if (triggers == null) triggers = this._events[eventName] = {};
  triggers[triggerSignature] = function() {
    return method.apply(context, args);
  };
};

Events.prototype.once = function(eventName, method, context) {
  var args = Array.prototype.slice.call(arguments, 3);
  var triggers = this._events[eventName];
  var triggerSignature = this.formatTriggerSig(method, context);
  if (triggers == null) triggers = this._events[eventName] = {};
  var _this = this;
  triggers[triggerSignature] = function() {
    var result = method.apply(context, args);
    _this.off(eventName, method, context);
    return result;
  };
};

Events.prototype.off = function(eventName, method, context) {
  var triggers = this._events[eventName];
  if (triggers == null) return;
  var triggerSignature = this.formatTriggerSig(method, context);
  delete triggers[triggerSignature];
  if (Object.keys(triggers).length === 0) {
    delete this._events[eventName];
  }
};

Events.prototype.trigger = function(eventName) {
  var triggers = this._events[eventName];
  if (triggers == null) return console.warn("No listeners on ", eventName, this);
  for (var signature in triggers) {
    triggers[signature]();
  }
};
Events.prototype.formatTriggerSig = function(method, context) {
  return context + "=>" + method;
};