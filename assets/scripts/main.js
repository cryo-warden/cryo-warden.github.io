---
---
requirejs(['cryo-warden'], function (cryoWarden) {
  cryoWarden.initialize({{ site.data | jsonify }});
});
