define(['./imports/index'], function (imports) {
  var uninitialized = {};
  var lazify = function (f) {
    var result = uninitialized;
    return function () {
      if (result === uninitialized) {
        result = f();
      }

      return result;
    };
  };

  return {
    lazify: lazify
  };
});
