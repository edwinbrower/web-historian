var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

//Changed to var - originally exports.headers
var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.sendResponse = function(res, data, statusCode) {
  var statusCode = statusCode || 200;
  res.writeHead(statusCode, headers);
  res.end(data); //original end - res.end(archive.paths.list)
};

exports.serveAssets = function(res, asset, callback) {
              // fs.readFile(asset, (err, data) => {
              //   if (err) { throw err; }
              //   callback(data);
              // });
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

};



// As you progress, keep thinking about what helper functions you can put here!
