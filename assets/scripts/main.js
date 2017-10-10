---
---
requirejs(['cryo-warden'], function (cryoWarden) {
  cryoWarden.initialize({
    data: ({{ site.data | jsonify }}),
    site: ({{ site | jsonify }})
  });
});
