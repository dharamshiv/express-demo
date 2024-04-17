const logger = require('./logger');
const mongoose = require('./mongoose');
const expressLoader = require('./express');
const dependencyInjectorLoader = require('./dependencyInjection')

module.exports = async (app) => {

  const mongoConnection = await mongoose();
  logger.info("DB Loaded and connected");

  // It returns the agenda instance because it's needed in the subsequent loaders
  const { agenda } = await dependencyInjectorLoader({
    mongoConnection
  });
  logger.info('✌️ Dependency Injector loaded');

  await expressLoader(app);
  logger.info('✌️ Express loaded');
};
