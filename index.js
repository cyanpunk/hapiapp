var Hapi = require('hapi');
var Slm = require('slm');
var SlmMarkdown = require('slm-markdown');

SlmMarkdown.register(Slm.template);

var server = new Hapi.Server();

server.connection({ host: 'node.dev', port: 1337 });

server.views({
  engines: {
    'slm': Slm
  },
  // basePath: __dirname,
  path: __dirname + '/views',
  compileOptions: {
    // basePath: __dirname + '/views',
    useCache: false
  },
  isCached: false
})

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, response) {
    response.view('index', { hello: "word" });
  }
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
  // server.log('Server started at ' + server.info.uri)
});
