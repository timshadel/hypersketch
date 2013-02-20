var request = require('superagent')
  , url = require('url');


function resolve(context, destination) {
  var base = (context && context.base ? context.base : '')
    , resolved = url.resolve(base, destination)
    , parsed = url.parse(resolved)
    , result = url.format(parsed);

  return result;
}

function handle(done) {
  return function(err) {
    done(err);
  };
}


function walk(path, val, visit) {
  if (val && typeof val === 'object') {
    for (var i in val) {
      if (val.hasOwnProperty(i)) {
        walk(path.concat(i), val[i], visit);
      }
    }
  }
  return visit(path, val);
}


function index(context) {
  var links = {};
  var src = {};
  var key;
  walk([], context.document, function(path, val) {
    key = path.join('.') || 'self';
    if (val.hasOwnProperty('href')) {
      links[key] = resolve(context, val['href']);
    }
    if (val.hasOwnProperty('src')) {
      src[key] = resolve(context, val['src']);
    }
  });
  context.links = links;
  context.src = src;
}


function fetch(context, done) {
  context.agent
    .get(context.base)
    .set('Accept', 'application/json')
    .on('error', handle(done))
    .end(function(res) {
      if (res.ok) {
        context.document = res.body;
        index(context);
        done(null, context);
      } else {
        console.log('fetched', res.error);
        done(res.error.message);
      }
    });
}

exports.context = function(start, done) {
  var base = resolve(null, start);
  var context = { agent: request.agent(), base: base };
  fetch(context, done);
};


exports.click = function(previous, link, done) {
  var context = {};
  // TODO: the other props?
  context.agent = previous.agent;
  var destination = previous.links[link];
  if (destination) {
    context.base = resolve(previous.base, destination);
    fetch(context, done);
  } else {
    done("Link " + link + " not found.");
  }
};

exports.navigate = function(context, path, callback) {
  var next = path.shift();
  exports.click(context, next, function(err, result) {
    if (path.length > 0) {
      navigate(result, path);
    } else {
      callback(null, result);
    }
  });
};

