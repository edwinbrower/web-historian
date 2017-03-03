var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, (err, data) => {
    if (err) {
      throw err;
    }
    var array = data.toString().split('\n');
    if (callback === undefined) {
      callback = _.identity;
    }
    callback(array);
  });
};


exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(sites) {
    var found = _.any(sites, function(site, i) {
      return site.match(url);
    });
    callback(found);
  });
};


// exports.isUrlInList = function(url, callback) {
//   // // we tried this earlier. it works. but it's not using the helper function that we just wrote #inefficient
//   // fs.readFile(exports.paths.list, (err, data) => {
//   //   if (err) {
//   //     throw err;
//   //   }
//   //   var string = data.toString();
//   //   var result = string.includes(url.toString());
//   //   callback(result);
//   // });
//   if (callback === undefined) {
//     callback = _.identity;
//   }
//   exports.readListOfUrls(array => {
//     callback(_.includes(array, url.toString()));  //THIS SHOULD BE A BOOLEAN
//   });
// };


exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', function(err, file) {
    callback();
  });
};

// exports.addUrlToList = function(url, callback) {
//   //NEED TO REVISIT, HAVE TO NEW LINE AFTER APPENDING 
//   fs.appendFile(exports.paths.list, url + '\n', (err, file) => {
//     // if (err) {
//     //   throw err;
//     // }
//     if (callback === undefined) {
//       callback = _.identity;
//     }    
//     callback();
//   });  
// };

exports.isUrlArchived = function(url, callback) {
  fs.readdir( exports.paths.archivedSites, (err, files) => {
    if (err) {
      throw err;
    }
    //files refers to an array of file names in archieve sites directory
    var result = _.contains(files, url.toString());
    if (callback === undefined) {
      callback = _.identity;
    }    
    callback(result); // THIS SHOULD BE A BOOLEAN
  });
};

exports.downloadUrls = function(urls) {
  // Iterate over urls and pipe to new files
  _.each(urls, function (url) {
    if (!url) { return; }
    request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
  });
};

