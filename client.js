var request = require('superagent');

var agent = request.agent();

function follow(href) {
  console.log('Following', href);
}

function click() {
  follow(this['href']);
}

function linkify(obj) {
  var links = [];
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    var sub = obj[keys[i]];
    if (typeof sub === 'object') {
      if (sub['href']) {
        links.push(sub);
        sub._click = click;
      }
    }
  }
  obj.links = links;
  return obj;
}

agent
  .get(process.env.BASE_URL || "http://localhost:3000/")
  .end(function(res) {
    if (res.ok) {
      var body = res.body;
      var linked = linkify(body);
      console.log('links', linked.links);
      linked.links[0]._click();
    } else {
      console.log('Res Error', res.text);
    }
  });