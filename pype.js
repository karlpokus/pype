module.exports = function(self, arr, errorHandler, cb) {
  var i, req, res,
      run = function() {
        arr[i++].call(self, req, res, next);
      },
      next = function(err) {
        if (err && errorHandler) {
          return errorHandler.call(self, err, req, res);
        }
        if (i < arr.length) {
          return run();
        } else if (cb) {
          return cb.call(self, req, res);
        }
      }

  return function(request, response) {
    if (request && response) {
      req = request;
      res = response;
    } else {
      req = {};
      res = {};
    }
    i = 0;
    run();
  }
};
