# pype
Middleware-style piping for server or browser. No dependencies. Works with async. WIP - not suitable for production.

# use cases
- Clean control flow
- Centralized error handling
- Testing a middleware stack without a server running
- or when you just don't feel like using express but you reeally like piping stuff

# install
```bash
$ npm install pype-stack
```

# usage
```javascript
// in browser or node w/o server
var pype = require('pype-stack'),
    one = function(req, res, next){
      req.foo = 1;
      return next();
    },
    two = function(){
      req.foo++;
      return next();
    },
    errorHandler = function(err, req, res){
      console.error(err);
    },
    finalHandler = function(req, res){
      console.log(req);
    },
    stack = [one, two, finalHandler];
// run
pype(null, stack, errorHandler)(); // logs {foo: 2}

// in node w server
var http = require('http'),
    server = http.createServer();
server.on('request', function(req, res){
  // run
  pype(null, stack, errorHandler, finalHandler)(req, res);
});
server.listen(3000);
```

# arguments
```javascript
pype(context, stack, errorHandler, finalHandler)(req, res);
// context: <any> value for 'this' for each fn
// stack: <array> of middleware
// errorHandler: <function> <optional> if called stops execution of the stack. Is passed the error.
// finalHandler: <function> <optional>
// returned fn: <function> <call required> <args optional>
```
Note: All middleware use express-style args `req, res, next`. The exceptions are `errorHandler` and `finalHandler`. `errorHandler` is unlike express a separate arg from the stack and only called w `err, req, res`. `finalHandler` is called w `req, res`. Empty objects are passed to return fn as default.

# test
```bash
$ npm test
```

# todos
- more tests

# licence
MIT
