var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers');

// require more modules/folders here!

var actions = {
  'GET': function(req, res) {
    // var data = httpHelper.serveAssets(res, './public/index.html', () => {}); //res, asset, callback
    fs.readFile('web/public/index.html', 'utf8', (err, data) => { 
      if (err) {
        throw err;
      }
      console.log('line 15', data);
      // return (JSON.stringify(data));
      httpHelper.sendResponse(res, data); //res, data, statusCode
      // JSON.stringify(data); 
    });
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
