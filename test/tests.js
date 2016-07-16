var test = require('tape'),
    pype = require('../pype'),
    one = function(req, res, next) {
      this.foo = 1;
      req.foo = 1;
      return next();
    },
    two = function(req, res, next) {
      this.foo++;
      req.foo++;
      return next();
    },
    errMessage = 'Oops!'
    three = function(req, res, next) {
      return next(errMessage);
    };

test('simple stack with context and finalHandler', function(t){
  var self = {};
  pype(self, [one, two], null, function(req, res){
    t.pass('no args passed to pypes return fn');
    t.pass('stack called');
    t.pass('errorHandler null bypassed');
    t.pass('finalHandler called');
    t.equal(self.foo, 2, 'this has data');
    t.equal(req.foo, 2, 'req has data');
    t.end();
  })();
});

test('simple stack with errorHandler', function(t){
  pype({}, [one, two, three], function(err){
    t.pass('stack called');
    t.pass('errorHandler called');
    t.pass('finalHandler omitted');
    t.equal(err, errMessage, 'error passed');
    t.end();
  })();
});

test('simple stack with finalHandler and passed args to return fn', function(t){
  var req = {};
  pype({}, [one, two], null, function(req, res){
    t.pass('stack called');
    t.pass('errorHandler null bypassed');
    t.pass('finalHandler called');
    t.equal(req.foo, 2, 'req has data');
    t.end();
  })(req, {});
});
