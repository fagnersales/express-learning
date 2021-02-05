const moment = require("moment");

const logger = (request, response, next) => {
  console.log(`[${moment().format('lll')}] [INFO] ${request.protocol}://${request.get('host')}${request.originalUrl}`)
  next()
}

module.exports = logger;