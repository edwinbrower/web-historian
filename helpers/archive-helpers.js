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

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

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
  //   fs.readFile(this.paths.list, 'utf8', callback(err, data));
  });
};

exports.isUrlInList = function(url, callback) {
  // // we tried this earlier. it works. but it's not using the helper function that we just wrote #inefficient
  // fs.readFile(exports.paths.list, (err, data) => {
  //   if (err) {
  //     throw err;
  //   }
  //   var string = data.toString();
  //   var result = string.includes(url.toString());
  //   callback(result);
  // });
  if (callback === undefined) {
    callback = _.identity;
  }
  exports.readListOfUrls(array => {
    callback(_.includes(array, url.toString()));  //THIS SHOULD BE A BOOLEAN
  });
};

exports.addUrlToList = function(url, callback) {
  //NEED TO REVISIT, HAVE TO NEW LINE AFTER APPENDING 
  fs.appendFile(exports.paths.list, url + '\n', (err) => {
    if (err) {
      throw err;
    }
    // callback(this.isUrlInList(url, _.indentity));
    if (callback === undefined) {
      callback = _.identity;
    }    
    callback(true);
  });  
};

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

// exports.downloadUrls = function(urls) {
//   // var helpMe = exports.isUrlArchived(urls[0], (bool) => { return bool; } );


//   //IMPORTANT: the url data will need to be changed to include the url DOM elements
//   _.each(urls, function(url) {  //when in a var it doesnt work though....why?
//     fs.writeFile( exports.paths.archivedSites + '/' + url, url, (err) => {
//       if (err) { 
//         throw err; 
//       }
//     });
//   });
// };


exports.downloadUrls = function(urls) {
  // Iterate over urls and pipe to new files
  _.each(urls, function (url) {
    if (!url) { return; }
    request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
  });
};

  //   exports.isUrlArchived(url, (bool) => {
  //     if (bool) {
  //       console.log('bool ', bool);
  //       // return bool;  //why cant you though?
  //       // shouldnt need to do something here
  //     } else {
  //       console.log('not', bool);
        // code to download urls will go here
        // thinking we will need to look at initialize here (or whatever created the files to archive in the tests)
        // };
   
  // _.each(urls, function(url) {
  //   // console.log('url is ', exports.isUrlArchived(url, _.identity)); // want it to be a bool
  //   //if (!isUrlArchived(url))
  // });
  // console.log('dl after each url ', urls);
// then check if !isUrlArchived 
//   write something here to archive it. (new functionality is here)
//};
















