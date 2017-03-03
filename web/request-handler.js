var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers');
var url = require('url');

// require more modules/folders here!

var actions = {
  'GET': function(req, res) {
    //THESE ARE THE SAME
    // console.log('urlPath', urlPath);
    // console.log('reqUrl', req.url);
    // var myUrl = url.parse(req.url);
    // var urlPath = myUrl.pathname;

    //DOES URL NOT HAVE ROOT
    if (req.url !== '/') {
      archive.isUrlInList(req.url, (bool) => { 
        //URL IS NOT IN LIST
        if (!bool) {
          httpHelper.serveAssets(res, req.url);
          archive.addUrlToList(req.url);
        } else {
        //URL IS IN LIST
          archive.isUrlArchived(req.url, (archiveBool)=>{
            if (archiveBool) {
            // Is also Archived
              httpHelper.serveAssets(res, req.url);
            } else {
            // On list but NOT archived
              httpHelper.serveAssets(res, req.url);
              // send 404
              // send loading
            }
          });
        }
      });
    } else {
      //SUBMIT RESPONSE WITH INDEX.HTML
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
    httpHelper.collectData(req, (info) => {
      var url = info.split('=')[1].replace('http://', '');
      archive.isUrlInList(url, bool => {
        if (!bool) {
          archive.addUrlToList(url);
          httpHelper.sendResponse(res, 'Found', 302);
        } else {
          console.log('IM NOT SUPPOSED TO BE HERE');
        }
      });
    });
  },
  'OPTIONS': function(req, res) {
  }
};



exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  if (action) {
    action(req, res);
  } else {
    httpHelper.sendResponse(res, 'Not Found', 404);
  }


  // res.end(archive.paths.list);
};
