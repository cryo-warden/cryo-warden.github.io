define(['utils/index', 'site-data'], function (utils, siteData) {
  window.cryoWarden = {
    utils: utils,
    data: siteData
  };

  if (document.querySelectorAll) {
    var obfuscatedLinks = document.querySelectorAll('.obfuscated-link');
    for (var i = 0; i < obfuscatedLinks.length; ++i) {
      var obfuscatedLink = obfuscatedLinks[i];
      var obfuscatedHref = obfuscatedLink.getAttribute('data-href-obfuscated');
      obfuscatedLink.setAttribute('href', utils.strings.clarifyUrl(obfuscatedHref));
    }
  }

  if (Math.random() < 1 / 3 && document.querySelector) {
    var header = document.querySelector('#header');
    if (!header) { return; }

    var anagrams = [
      'wordy crane',
      'one wry card',
      'wary nerd co',
      'a wry nerd co',
      'awry nerd co',
      'worry dance',
      'candy rower',
      'dry cane row',
      'rye orc dawn',
      'crown deary',
    ];

    header.textContent = anagrams[Math.floor(Math.random() * anagrams.length)];
  }
});
