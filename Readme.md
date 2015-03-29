# formatter-stream

Stream that transforms objects into strings using pre-defined format.
Useful for streaming logs.


### Installation

```
$ npm install formatter-stream --save
```


### Usage


```javascript
var FormatterStream = require('formatter-stream');

var stream = new FormatterStream(':author wrote ":book"');

stream.on('data', function (data) {
	data.toString() === 'Arthur Conan Doyle wrote "Sherlock Holmes"'; // true
});

stream.write({
	author: 'Arthur Conan Doyle',
	book: 'Sherlock Holmes'
});

stream.end();
```


### Tests

[![Circle CI](https://circleci.com/gh/vdemedes/formatter-stream.svg?style=svg)](https://circleci.com/gh/vdemedes/formatter-stream)

```
$ npm test
```


### License

formatter-stream is released under the MIT license.
