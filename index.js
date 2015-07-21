'use strict';

// require('pretty-error').start();

var Hapi = require('hapi');
var Good = require('good');
var Jade = require('jade');
var Colors = require('colors');
var Colorterm = require('colorterm');
var GoodColorterm = require('good-colorterm');
var GoodConsole = require('good-console');
// var Slm = require('slm');
// var SlmMarkdown = require('slm-markdown');

// SlmMarkdown.register(Slm.template);

// Error.prepareStackTrace = function () { };

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
  config: {
    id: 'root',
    handler: function (request, reply) {
      reply.view('index', { hello: "word" });
    }
  }
});

server.route({
  method: 'GET',
  path: '/500',
  config: {
    handler: function (request, reply) {
      reply.view('indexdd', { hello: "word" });
    }
  }
});

var options = {
  opsInterval: 60000,
  reporters: [
    {
      reporter: GoodColorterm,
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
      console.dir( {bar: "This is a console.dir message", test: "yo", username: 'rafeca', url: 'https://github.com/rafeca', twitter_account: 'https://twitter.com/rafeca', projects: ['prettyprint', 'connfu'], lalala: [] } );
      console.log('This is standard log by console.log(string)');
      // console.info('This is standard info by console.info(string)');
      // console.warn('This is standard warn by console.warn(string)');
      // console.error('This is standard error by console.error(string)');
      // console.error(server.info);
      // console.dir('This is standard dir by console.dir(string)');
      // console.dir(server.info);
      // console.trace('This is standard trace by console.trace(string)');
      // console.trace(server.info);
      // server.log('tooo', 'This is server log object');
      // server.log('hello', { data: "fsdfsd" });
      // server.log('server',{data: "fsdfs"});
      // server.lookup('root');
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
