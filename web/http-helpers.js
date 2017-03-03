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
  exports.sendResponse(res, 'Not Found', 404);
};

exports.redirectResponse = function(res, location, statusCode) {
  var statusCode = statusCode || 200;
  res.writeHead(statusCode, {location: location});
  res.end();
};

exports.sendResponse = function(res, data, statusCode) {  //was: res, data, statusCode
  var statusCode = statusCode || 200;
  res.writeHead(statusCode, headers);
  res.end(data); //original end - res.end(archive.paths.list)
};

//EXPORTS.SERVEASSETS HAD A CALLBACK PARAMETER; DIDN'T HAVE STATUS CODE
exports.serveAssets = function(res, asset, callback) {
// var fileStr = archive.paths.siteAssets + asset;
//IS IT IN THE PUBLIC FOLDER?
  fs.readFile(archive.paths.siteAssets + asset, (err, data) => {
    if (err) {
      //IS IT IN THE ARCHIVED FOLDER?
      fs.readFile(archive.paths.archivedSites + asset, (err, data) => { 
        if (err) {
          exports.send404(res);
        }
        //IT DOES EXIST IN THE ARCHIVE FOLDER
        exports.sendResponse(res, data); //res, data, statusCode
      });
    } else {
      //IT DOES EXIST IN THE PUBLIC FOLDER
      exports.sendResponse(res, data);
    }

    // var fileStr = archive.paths.siteAssets + asset;
    // fs.readFile(fileStr, 'utf8', (err, data) => { 
    //   if (err) {
    //     throw err;
    //   }
    //   this.sendResponse(res, data); //res, data, statusCode
    // });



                // fs.readFile(asset, (err, data) => {
                //   if (err) { throw err; }
                //   callback(data);
                // });
    // Write some code here that helps serve up your static files!
    // (Static files are things like html (yours or archived from others...),
    // css, or anything that doesn't change often.)

  });



// As you progress, keep thinking about what helper functions you can put here!
};