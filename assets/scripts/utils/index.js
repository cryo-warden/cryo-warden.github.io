define([
  './imports/index', './math', './strings', './functions'
], function (imports, math, strings, functions) {
  return {
    _: imports._,
    ko: imports.ko,
    seedrandom: imports.seedrandom,
    jQuery: imports.jQuery,

    math: math,
    strings: strings,
    functions: functions
  };
});
