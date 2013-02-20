var agent = require('./lib/agent');

var start = process.env.BASE_URL || "http://localhost:3000/";

var clickPath = ['ui'];

agent.context(start, function(err, context) {

  agent.navigate(context, clickPath, function(err, result) {
    console.log('links', result.links);
  });

});
