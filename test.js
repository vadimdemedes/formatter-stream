/**
 * Dependencies
 */

var FormatStream = require('./');

require('chai').should();


/**
 * Tests
 */

describe('format-stream', function () {
  it ('throw an error when format is undefined', function () {
    var stream = new FormatStream();
    
    var errorThrown = false;
    
    try {
      stream.write({ message: 'hello' });
    } catch (err) {
      err.message.should.equal('Format is undefined');
      errorThrown = true;
    }
    
    errorThrown.should.equal(true);
  });
  
  it ('throw an error when data is not an object', function () {
    var stream = new FormatStream();
    
    var errorThrown = false;
    
    try {
      stream.write();
    } catch (err) {
      err.message.should.equal('Data is not an object');
      errorThrown = true;
    }
    
    errorThrown.should.equal(true);
  });
  
  it ('transform object to string', function (done) {
    var stream = new FormatStream(':author wrote ":book"');
    
    stream.on('data', function (data) {
      data.toString().should.equal('Arthur Conan Doyle wrote "Sherlock Holmes"\n');
    });
    
    stream.on('end', done);
    
    stream.write({
      author: 'Arthur Conan Doyle',
      book: 'Sherlock Holmes'
    });
    
    stream.end();
  });
});
