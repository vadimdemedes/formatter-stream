/**
 * Dependencies
 */

var TransformStream = require('readable-stream').Transform;
var stringify = require('json-stringify-safe');
var inherits = require('util').inherits;


/**
 * Expose LogStream
 */

module.exports = LogStream;


/**
 * LogStream
 */

function LogStream (format) {
  TransformStream.call(this);
  
  this.format = format;
  
  // stringify objects
  this.write = function (data) {
    if (typeof data !== 'object') throw new Error('Data is not an object');
    
    TransformStream.prototype.write.call(this, stringify(data));
  };
  
  // transform object into entry
  this._transform = function (data, enc, cb) {
    if (!this.format) throw new Error('Format is undefined');
    
    data = JSON.parse(data);
    
    var output = this.format.replace(/\:([a-z0-9_]+)/g, function (key) {
      return data[key.slice(1)];
    });

    this.push(output + '\n');
    cb();
  };
}

inherits(LogStream, TransformStream);
