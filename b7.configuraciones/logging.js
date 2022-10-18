
const winston = require('winston');
const { combine, timestamp, printf, colorize, align, json } = winston.format;
const LEVEL = Symbol.for('level');

const logLevels0 = {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7,
    error: 00,
    warn: 01,
    info: 02,
    http: 03,
    verbose: 04,
    debug: 05,
    silly: 06,
    fatal_ne: 10,
    error: 11,
    warn: 12,
    info: 13,
    debug: 14,
    trace_ne: 15,
  };

const logLevels = {
    error: 0,
    warn: 1,
    verbose: 2,
    debug: 3,
    info: 4,
  };

function filterOnly(level) {
    return winston.format(function (info) {
      if (info[LEVEL] === level) {
        return info;
      }
    })();
  }
//let modulo='Default'
const logGeneral = winston.createLogger({
    levels: logLevels,
    //levels: winston.config.syslog.levels,
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
      colorize({ all: true }),
      align(),
      timestamp({format: 'DD-MM-YY hh:mm:ss.SSS A',}),
      printf((info) => `${info.level}: ${info.modulo} ${info.recurso} ${info.message} [${info.timestamp}]`),
    ),
    transports: [
      new winston.transports.Console(),
      //new winston.transports.File({filename: 'combined.log'}),
      new winston.transports.File({
          filename: 'app-error.log',
          level: 'error',
          format: combine(filterOnly('error'))}),
      new winston.transports.File({
          filename: 'app-info.log',
          level: 'info',
          format: combine(filterOnly('info'))}),
    ],
  });
//const childLogger=logGeneral.child({modulo:'b0.server.js'})
//return childLogger
    

module.exports = logGeneral