define(['utils/index'], function (utils) {
  return {
    initialize: function (data) {
      window.cryoWarden = {
        utils: utils,
        data: data
      };

      if (document.querySelectorAll) {
        var obfuscatedLinks = document.querySelectorAll('.obfuscated-link');
        for (var i = 0; i < obfuscatedLinks.length; ++i) {
          var obfuscatedLink = obfuscatedLinks[i];
          var obfuscatedHref = obfuscatedLink.getAttribute('data-href-obfuscated');
          obfuscatedLink.setAttribute('href', utils.strings.clarifyUrl(obfuscatedHref));
        }
      }

      if (Math.random() < 1/7 && document.querySelector) {
        var header = document.querySelector('#header');
        if (!header) { return; }
    
        header.textContent = [
          'wordy crane',
          'one wry card',
          'wary nerd co',
          'a wry nerd co',
          'awry nerd co',
          'worry dance',
          'candy rower'
        ][Math.floor(Math.random() * 7)];
      }
    }
  };
});
