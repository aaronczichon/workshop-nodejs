const { writeLogFile } = require("./file-handler");

const loggingMiddleware = async (req, res, next) => { 
  const timestamp = Date.now();
  const method = req.method;
  const url = req.url;

  const data = `${timestamp}: ${method} ${url}\r\n`;

  await writeLogFile(data);

  next();
};

module.exports.loggingMiddleware = loggingMiddleware;