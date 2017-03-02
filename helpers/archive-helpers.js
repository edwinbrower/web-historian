var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
  fs.readFile(this.paths.list, (err, data) => {
    if (err) {
      throw err;
    }
    var array = data.toString().split('\n');
    return callback(array);
  //   fs.readFile(this.paths.list, 'utf8', callback(err, data));
  });


};

exports.isUrlInList = function(url, callback) {
  console.log('url', url);
  // var array = this.readListOfUrls((data) => callback(data));
  fs.readFile(this.paths.list, (err, data) => {
    if (err) {
      throw err;
    }
    var string = data.toString();
    var result = string.includes(url.toString());
    return callback(result);
  });
  
  // console.log('array', array);
  // var string = array.join('\n');
  // console.log('string', string);
  // return string.includes(url);
  // var array = this.paths.list.split('/n');
  // return _.contains(array, callback(url));
};

exports.addUrlToList = function(url, callback) {
  
  // var array = this.paths.list.split('/n');
  //clean up the url so that it only contains domain name
  //we'll push the target url to the array
   
};

exports.isUrlArchived = function(url, callback) {
  fs.access(this.paths.archivedSites + url, (err, data) => {
    if (err) {
      return false;
    } else { 
      return true; 
    }
  });
};

exports.downloadUrls = function(urls) {
};
