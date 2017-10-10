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
    initialize: function (jekyllData) {
      window.cryoWarden = {
        obfuscateUrl: obfuscateUrl,
        clarifyUrl: clarifyUrl,
        data: jekyllData.data,
        site: jekyllData.site
      };

      if (document.querySelectorAll) {
        var obfuscatedLinks = document.querySelectorAll('.obfuscated-link');
        for (var i = 0; i < obfuscatedLinks.length; ++i) {
          var obfuscatedLink = obfuscatedLinks[i];
          var obfuscatedHref = obfuscatedLink.getAttribute('data-href-obfuscated');
          obfuscatedLink.setAttribute('href', clarifyUrl(obfuscatedHref));
        }
      }

      if (Math.random() < 1/8 && document.querySelector) {
        var header = document.querySelector('#header');
        if (!header) { return; }
    
        header.textContent = [
          'wordy crane',
          'one wry card',
          'wary nerd co'
        ][Math.floor(Math.random() * 3)];
      }
    }
  };
});
