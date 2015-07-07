'use strict';

var Colors = require('colors');
var Colorterm = require('colorterm');
var Hapi = require('hapi');
var Slm = require('slm');
var SlmMarkdown = require('slm-markdown');

SlmMarkdown.register(Slm.template);

var console = Colorterm();
var server = new Hapi.Server();

server.connection({
  host: 'node.dev',
  port: process.env.PORT || 1337
});

server.views({
  engines: {
    'slm': Slm
  },
  // Commented out, cause some Error
  // TODO: Create new issue on GitHub
  // basePath: __dirname,
  path: __dirname + '/views',
  compileOptions: {
    // Commented out, cause some Error
    // TODO: Create new issue on GitHub
    // basePath: __dirname + '/views',
    useCache: false
  },
  isCached: false
})

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply.view('index', { hello: "word" });
  }
});

server.start(function () {
  console.log('Server running at: %s', server.info.uri.blue);
  console.info('Server running at: %s', server.info.uri.blue);
  console.warn('Server running at: %s', server.info.uri.blue);
  console.error('Server running at: %s', server.info.uri.blue);
  // console.dir( {bar: "This is a console.dir message"} );
  // server.log('Server started at ' + server.info.uri)
});
