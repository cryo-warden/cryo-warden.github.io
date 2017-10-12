define([], function () {
  var charCodeSmallA = 'a'.charCodeAt(0);
  var charCodeBigA = 'A'.charCodeAt(0);
  var rotateLetter = function (letter, rotation) {
    if (letter.match(/[a-z]/)) {
      return String.fromCharCode(
        (letter.charCodeAt(0) - charCodeSmallA + 26 + rotation) % 26 + charCodeBigA
      );
    }

    return String.fromCharCode(
      (letter.charCodeAt(0) - charCodeBigA + 26 + rotation) % 26 + charCodeSmallA
    );
  };

  var obfuscateUrl = function (url) {
    return (
      url
      .replace(/\./g, '__70__')
      .replace(/:/g, '__12__')
      .replace(/@/g, '__51__')
      .replace(/[a-zA-Z]/g, function (letter) {
        return rotateLetter(letter, 9);
      })
    );
  };

  var clarifyUrl = function (obfuscatedUrl) {
    return (
      obfuscatedUrl
      .replace(/__70__/g, '.')
      .replace(/__12__/g, ':')
      .replace(/__51__/g, '@')
      .replace(/[a-zA-Z]/g, function (letter) {
        return rotateLetter(letter, -9);
      })
    );
  };

  return {
    obfuscateUrl: obfuscateUrl,
    clarifyUrl: clarifyUrl
  };
});
