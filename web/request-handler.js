var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers');

// require more modules/folders here!

var actions = {
  'GET': function(req, res) {
    // fs.readFile('web/public/index.html', 'utf8', (err, data) => { 
    // var fileStr = path.join(__dirname, '/public/index.html');

    // Tried Refactoring
    if (req.url !== '/') {
      console.log('in archive section');
      // archive.readListOfUrls( () => {
      //   //right now we have an array..but we wanted to have 
      //   httpHelper.sendResponse(res, data);
      // });
      // archive.addUrlToList(req.url, );

      // if (archive.isUrlArchived(req.url, _.identity)) {
      // // if (archive.isUrlArchived(req.url, (url) => _.identity(url) )) {
      //   console.log('inside if');
      //   var path = archive.isUrlArchived + '/' + req.url;
      //   console.log(path);
      //   sendResponse(path, res);
      // }
    } else {
    // httpHelper.serveAssets(res, '/index.html');
      httpHelper.serveAssets(res, '/index.html');
    }


/// What we previously wrote that worked
    // if (req.url !== '/') {
    //   var fileStr = archive.paths.archivedSites + req.url;
    //   fs.readFile(fileStr, 'utf8', (err, data) => { 
    //     if (err) {
    //       throw err;
    //     }
    //     httpHelper.sendResponse(res, data); //res, data, statusCode
    //   }); 
    // } else {
    //   httpHelper.serveAssets(res, '/index.html');
    // }


    // var fileStr = archive.paths.archivedSites + req.url;
    // fs.readFile(fileStr, 'utf8', (err, data) => { 
    //   if (err) {
    //     throw err;
    //   }
    //   httpHelper.sendResponse(res, data); //res, data, statusCode
    // });
  },
  'POST': function(req, res) {

  },
  'OPTIONS': function(req, res) {

  }
};



exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  if (action) {
    action(req, res);
  } else {
    //ERROR Handler
    console.log('error');
  }


  // res.end(archive.paths.list);
};
