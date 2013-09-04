var winston = require('winston');
require('winston-loggly');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ json: false, timestamp: true, level: 'debug' }), 
    new winston.transports.File({ filename: __dirname + '/debug.log', json: false, level:'debug' }), 
    new winston.transports.Loggly({ subdomain:'samuel', inputToken:'f34e25fa-996c-4feb-a310-2dcd32a455b9', level:'warn' })
  ],  
  exceptionHandlers: [
    new (winston.transports.Console)({ json: false, timestamp: true }), 
    new winston.transports.File({ filename: __dirname + '/exceptions.log', json: false }),
    new winston.transports.Loggly({ subdomain:'samuel', inputToken:'f34e25fa-996c-4feb-a310-2dcd32a455b9' })
  ],  
  exitOnError: false
});

//winston.add(winston.transports.Loggly, { subdomain:'samuel', inputToken:'f34e25fa-996c-4feb-a310-2dcd32a455b9' });
module.exports = logger;
