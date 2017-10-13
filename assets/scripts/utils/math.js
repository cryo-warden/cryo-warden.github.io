define(['./imports/index'], function (imports) {
  var seedrandom = imports.seedrandom;

  var interpolateLinear = function (a, b, t) {
    return a + t * (b - a);
  };

  var interpolateCubic = function (a, b, t) {
      return a + (3 - 2 * t) * t * t * (b - a);
  };

  var getRandom = function (x, y, entropy) {
      var rng = new seedrandom(x + '|' + y + '|' + entropy);
      return rng.double();
  };

  var getSingleNoise = function (x, y, entropy) {
    var xInt = Math.floor(x);
    var yInt = Math.floor(y);
    var x0y0 = getRandom(xInt, yInt, entropy);
    var x1y0 = getRandom(xInt + 1, yInt, entropy);
    var x0y1 = getRandom(xInt, yInt + 1, entropy);
    var x1y1 = getRandom(xInt + 1, yInt + 1, entropy);

    var xt = x - xInt;
    var yt = y - yInt;

    return interpolateCubic(
      interpolateCubic(x0y0, x1y0, xt),
      interpolateCubic(x0y1, x1y1, xt),
      yt
    );
};

// noise algorithm based on techniques described at http://www.angelcode.com/dev/perlin/perlin.html

  var INTENSITY_SCALE = 32 / 63; // 2 ^ (n - 1) / (2 ^ n - 1) where n = 6
  var SCALE_0 = 1 / 32;
  var ENTROPY_0 = 'g;xa[[c53';
  var SCALE_1 = 1 / 16;
  var ENTROPY_1 = 'a2vap0vm54';
  var SCALE_2 = 1 / 8;
  var ENTROPY_2 = ' 8zs9nb6kts';
  var SCALE_3 = 1 / 4;
  var ENTROPY_3 = 'a203b=n.hj';
  var SCALE_4 = 1 / 2;
  var ENTROPY_4 = 'c2gc12hc4';
  var SCALE_5 = 1;
  var ENTROPY_5 = ']]8\ 8\ 5';

  var getNoiseField = function (x, y, seed) {
    return INTENSITY_SCALE * (
      getSingleNoise(x * SCALE_0, y * SCALE_0, seed + ENTROPY_0) +
      INTENSITY_SCALE * (
        getSingleNoise(x * SCALE_1, y * SCALE_1, seed + ENTROPY_1) +
        INTENSITY_SCALE * (
          getSingleNoise(x * SCALE_2, y * SCALE_2, seed + ENTROPY_2) +
          INTENSITY_SCALE * (
            getSingleNoise(x * SCALE_3, y * SCALE_3, seed + ENTROPY_3) +
            INTENSITY_SCALE * (
              getSingleNoise(x * SCALE_4, y * SCALE_4, seed + ENTROPY_4) +
              INTENSITY_SCALE * (
                getSingleNoise(x * SCALE_5, y * SCALE_5, seed + ENTROPY_5)
              )
            )
          )
        )
      )
    );
  };

  return {
    getRandom: getRandom,
    interpolateCubic: interpolateCubic,
    getSingleNoise: getSingleNoise,
    getNoiseField: getNoiseField
  };
});
