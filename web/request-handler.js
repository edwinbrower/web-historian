var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers');
var url = require('url');

var actions = {
  'GET': function(req, res) {
    var parts = url.parse(req.url);
    var urlPath = parts.pathname;
    if ( urlPath === '/') {
      urlPath = '/index.html';
    }
    httpHelper.serveAssets(res, urlPath, () => {
      archive.isUrlInList(urlPath.slice(1), (bool) => { 
        //URL IS NOT IN LIST
        if (!bool) {
          httpHelper.send404(res);
        } else {
        //URL IS IN THE LIST
          httpHelper.redirectResponse(res, '/loading.html');
        }
      });
    });

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
    httpHelper.send404(res);
  }
};
