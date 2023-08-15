//call next so as to move to the next middleware in the stack
const moment = require('moment')
const logger = (req,res,next) =>{
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}:${moment().format()}`)
    next();
}

module.exports = logger;