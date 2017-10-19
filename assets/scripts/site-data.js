---
---

define([], function () {
  return {{ site.data | jsonify }};
});
