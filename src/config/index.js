process.env.NODE_ENV = process.env.NODE_ENV || "development";

config = {
  port: process.env.PORT,

  host: process.env.HOST_NAME,

  databaseURL: process.env.MONGODB_URI,

  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },

  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
  },

  /**
   * API configs
   */
  api: {
    prefix: "/api",
  },
};
module.exports = config;
