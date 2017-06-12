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
      if (urlPath[0] === '/') { 
        urlPath = urlPath.slice(1); 
      }
      archive.isUrlInList(urlPath, (bool) => { 
        if (!bool) { //URL IS NOT IN LIST
          httpHelper.send404(res);
        } else { //URL IS IN THE LIST
          httpHelper.redirectResponse(res, '/loading.html');
        }
      });
    });
  },
  'POST': function(req, res) { 
    httpHelper.collectData(req, (info) => {
      var domainUrl = info.split('=')[1].replace('http://', '');
      archive.isUrlInList(domainUrl, bool => {     
        if (bool) { //URL IS IN THE LIST
          archive.isUrlArchived(domainUrl, (bool) => {
            if (bool) { //URL IS ARCHIVED
              httpHelper.redirectResponse(res, '/' + domainUrl);
            } else { //URL IS NOT ARCHIVED
              httpHelper.redirectResponse(res, '/loading.html');
            }
          });
        } else { // URL IS NOT IN THE LIST
          console.log(domainUrl);
          archive.addUrlToList(domainUrl, () => {
            httpHelper.redirectResponse(res, '/loading.html', 302); // 302 here to pass the test
          });
        }
      });
    });
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
