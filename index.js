'use strict';

var Colors = require('colors');
var Colorterm = require('colorterm');
var Good = require('good');
var GoodConsole = require('good-console');
var Hapi = require('hapi');
var Jade = require('jade');
// var Slm = require('slm');
// var SlmMarkdown = require('slm-markdown');

// SlmMarkdown.register(Slm.template);

var console = new Colorterm();
var server = new Hapi.Server();

server.connection({
  host: 'node.dev',
  port: process.env.PORT || 1337
});

server.views({
  engines: {
    jade: Jade
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

var options = {
  opsInterval: 15000,
  reporters: [
    {
      reporter: GoodConsole,
      events: {
        ops: '*',
        error: '*',
        log: '*',
        response: '*',
        request: '*'
      }
    }
  ]
  // }, {
  //   reporter: require('good-file'),
  //   events: { ops: '*' },
  //   config: './test/fixtures/awesome_log'
  // }, {
  //   reporter: 'good-http',
  //   events: { error: '*' },
  //   config: {
  //     endpoint: 'http://prod.logs:3000',
  //     wreck: {
  //       headers: { 'x-api-key' : 12345 }
  //     }
  //   }
  // }]
};

server.register({
  register: Good,
  options: options
}, function (err) {

  if (err) {
    console.error(err);
  }
  else {
    server.start(function () {
      console.info('Server started successfully.');
      console.dir(server.info);
      server.log({data: "fsdfs"});
    });
  }
});

// server.start(function () {
//   console.log('Server successfully started...');
//   console.info('Server successfully started...');
//   console.warn('Server successfully started...');
//   console.error('Server successfully started...');
//   // console.dir( {bar: "This is a console.dir message", test: "yo", username: 'rafeca', url: 'https://github.com/rafeca', twitter_account: 'https://twitter.com/rafeca', projects: ['prettyprint', 'connfu'] } );
//   console.dir(server.info);
//   console.log('oh yeah!')
//   // server.log('Server started at ' + server.info.uri)
// });
