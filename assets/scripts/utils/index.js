define(['./imports/index', './math', './strings'], function (imports, math, strings) {
  return {
    _: imports._,
    ko: imports.ko,
    seedRandom: imports.seedRandom,
    jQuery: imports.jQuery,

    math: math,
    strings: strings
  };
});
