var mixin = function(target, source, overwrite) {
  overwrite = overwrite || false;
  var completeKeys = [];
  var rewind = function() {
    for (var key in completeKeys) {
      delete target[key];
    }
  };
  for (var key in source) {
    if(overwrite || target[key] === undefined) {
      target[key] = source[key];
      completeKeys.push(key);
    } else {
      rewind();
      break;
    }
  }
};