const { transports, format, createLogger } = require("winston");
require("winston-mongodb");
const config = require("../config");
var path = require("path");

const environment = process.env.NODE_ENV || "development";

const errorLogFileName = path.join(__dirname, "../logs/error.log");
const combineLogFileName = path.join(__dirname, "../logs/combine.log");
const uncoughtExceptionFileName = path.join(
  __dirname,
  "../logs/uncaughtExceptions.log"
);

const logFormat = format.combine(
  format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  format.errors({ stack: true }),
  format.splat(), // Enables string interpolation
  format.printf((info) => {
    // console.log(info);
    const { level, message, timestamp, stack, exception, rejection } = info;
    let errorMessage = "";
    if (!rejection && !exception && stack) {
      errorMessage = `${timestamp} ${level}: ${message} \n ${stack}`;
    } else {
      errorMessage = `${timestamp} ${level}: ${message}`;
    }
    return errorMessage;
  })
);

const excludeErrorLevel = format((info) => {
  if (info.level === "error") {
    return false; // Exclude error messages from this format
  }
  return info; // Include other log messages
});

// console transports
const consoleTransport = new transports.Console({
  format: format.combine(format.colorize({ all: true })),
});

const errorFileTransport = new transports.File({
  level: "error",
  filename: errorLogFileName,
});

const combineFileTransport = new transports.File({
  filename: combineLogFileName,
  format: format.combine(excludeErrorLevel()),
});

const exceptionHandlers = [
  new transports.File({
    filename: uncoughtExceptionFileName,
  }),
  new transports.Console(),
];

const mongoDBTransport = new transports.MongoDB({
  level: "error",
  db: config.databaseURL,
  format: format.combine(format.metadata()), // logs stack trace into mongoDB
});

const logger = createLogger({
  level: environment === "development" ? "debug" : "info",
  format: logFormat,
  exceptionHandlers: exceptionHandlers,
  rejectionHandlers: exceptionHandlers,
  transports: [
    consoleTransport,
    errorFileTransport,
    combineFileTransport,
    mongoDBTransport,
  ],
});

module.exports = logger;
