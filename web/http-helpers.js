var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.collectData = function(req, callback) {
  var info = '';
  req.on('data', function(chunk) {
    info += chunk;
  });
  req.on('end', function() {
    callback(info);
  });
};

exports.send404 = function(res) {
  exports.sendResponse(res, '404: Page Not Found', 404);
};

exports.redirectResponse = function(res, location, statusCode) {
  var statusCode = statusCode || 302;
  res.writeHead(statusCode, {location: location});
  res.end();
};

exports.sendResponse = function(res, data, statusCode) {  
  var statusCode = statusCode || 200;
  res.writeHead(statusCode, headers);
  res.end(data);
};

exports.serveAssets = function(res, asset, callback) {
  var encoding = {encoding: 'utf8'};
  fs.readFile(archive.paths.siteAssets + asset, encoding, (err, data) => {
    // First see if it's in the public folder (index or loading pages)
    if (err) { // Not in public folder
      fs.readFile(archive.paths.archivedSites + asset, encoding, (err, data) => { 
        // If it isn't in the public folder 
        // Then check if it is in the Archive Folder
        if (err) { // Not in Archive folder so add or wait more for cron
          if (callback) {
            callback();
          } else {
            exports.send404(res);
          }
        } else { //It is in the archive folder so display the contents.
          exports.sendResponse(res, data);
        }
      });
    } else { // It is in public folder so send to that index / loading page.
      exports.sendResponse(res, data);
    }
  });
};