
const winston = require('winston');
const { combine, timestamp, printf, colorize, align, json } = winston.format;
const LEVEL = Symbol.for('level');

const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
  };

function filterOnly(level) {
    return winston.format(function (info) {
      if (info[LEVEL] === level) {
        return info;
      }
    })();
  }
//let modulo='Default'
const factoryLog=(modulo)=>{
    const logGeneral = winston.createLogger({
        levels: logLevels,
        level: process.env.LOG_LEVEL || 'fatal',
        format: combine(
          
          timestamp({format: 'DD-MM-YY hh:mm:ss.SSS A',}),
        ),
        transports: [
          new winston.transports.Console({
              level: 'info',
              format: combine(filterOnly('info'),colorize({ all: true }),align(),printf((info) => `${info.level}: ${modulo} ${info.id} ${info.message} [${info.timestamp}]`))}),
          new winston.transports.Console({
            level: 'trace',
            format: combine(filterOnly('trace'),colorize({ all: true }),align(),printf((info) => `${info.level}: ${modulo} ${info.message} [${info.timestamp}]`))}),
          new winston.transports.Console({
              level: 'debug',
              format: combine(filterOnly('debug'),colorize({ all: true }),printf((info) => `${info.level}: ${modulo} ${info.message} [${info.timestamp}]`))}),
          //new winston.transports.File({filename: 'combined.log'}),
          new winston.transports.File({
              filename: 'app-error.log',
              level: 'error',
              format: combine(filterOnly('error'),colorize({ all: true }))}),
          new winston.transports.File({
              filename: 'app-info.log',
              level: 'info',
              format: combine(filterOnly('info'),colorize({ all: true }),printf((info) => `${info.level}: ${info.message} [${info.timestamp}]`))}),
        ],
      });
    //const childLogger=logGeneral.child({modulo:'b0.server.js'})
    //return childLogger
    return logGeneral
}

module.exports = factoryLog