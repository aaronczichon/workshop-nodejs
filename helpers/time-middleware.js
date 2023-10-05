const timeMiddleware = (req, res, next) => {
  console.log('Time: ', Date.now());

  next();
}

module.exports.timeMiddleware = timeMiddleware;