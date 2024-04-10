const logger = require('./logger');
const mongooseLoader = require('./mongoose');
const expressLoader = require('./express');
const dependencyInjectorLoader = require('./dependencyInjection')

module.exports = async ({expressApp}) => {
  const mongoConnection = await mongooseLoader();
  logger.info("DB Loaded and connected");

  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

 /*  const userModel = {
    name: 'userModel',
    // Notice the require syntax and the '.default'
    model: require('../models/user').default,
  }; */

  // It returns the agenda instance because it's needed in the subsequent loaders
  const { agenda } = await dependencyInjectorLoader({
    mongoConnection
  });
  
  logger.info('✌️ Dependency Injector loaded');

  await expressLoader({ app: expressApp });
  logger.info('✌️ Express loaded');
};
