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
  // var storage = '';
  // fs.readFile(this.paths.list, (err, data) => {
  //   if (err) {
  //     throw err;
  //   }
  //   storage = data.toString();
  //   console.log('1', storage);
  //   storage += url.toString();
  //   console.log('2', storage);
  //   done();
  // });

  // fs.writeFile(this.paths.list, storage, (err) => {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log('inside writeFile', storage);
  //   done();
  // });

  fs.appendFile(this.paths.list, url, (err) => {
    if (err) {
      throw err;
    }
    // callback(this.isUrlInList(url, _.indentity));
    callback(true);
    console.log('The "data to append" was appended to file!');
  });

  

    // var test = this.isUrlInList(url, () => {

    // });
    // var test1 = exports.isUrlInList(url, _.identity);

    // console.log('0 ', test);
    // console.log('1 ', test1);
    // return callback(test);

    // return callback(string);
  
};

exports.isUrlArchived = function(url, callback) {
  // fs.access(this.paths.archivedSites + url, (err, data) => {
  //   if (err) {
  //     return false;
  //   } else { 
  //     return true; 
  //   }
  // });
  var pathhh = this.paths.archivedSites + 'something';
  fs.readFile(pathhh, (err, data) => {
    if (err) {
      throw err;
    }
    console.log('isUrlArchived??? ', data);
    // var array = data.toString().split('\n');
    // return callback(array);
  //   fs.readFile(this.paths.list, 'utf8', callback(err, data));
  });

};

exports.downloadUrls = function(urls) {
};
