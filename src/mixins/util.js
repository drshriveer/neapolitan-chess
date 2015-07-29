var methods = {
  // each: function(method) {
  //   if (this == null) return false;
  //   if (this instanceof Array) {
  //     for(var i = 0; i < this.length; i++) {
  //       method.call(this, this[i], i, this);
  //     }
  //   } else if (this instanceof Object) {
  //     for(var key in this) {
  //       method.call(this, this[key], key, this);
  //     }
  //   }
  // },

  // map: function(method) {
  //   var result = [];
  //   this.each(function(val, key, self){
  //     result.push(method.call(this, val, key, self));
  //   });
  //   return result;
  // },

  contains: function(targetValue) {
    var contained = false;
    this.forEach(function(value){
      if (value == targetValue) contained = true;
    });
    return contained;
  }

};

mixin(Array.prototype, methods, true);