const { Container }= require('typedi');
const logger = require('./logger')
const agendaFactory = require('./agenda');
const modelInjection = require('./modelsInjection');
const serviceInjection = require('./servicesInjection');
const controllersInjection = require('./controllersInjection');


module.exports = ({mongoConnection}) => {
  try {
    
    Container.set('logger', logger);
    
    modelInjection();
    serviceInjection();
    controllersInjection();

    const agendaInstance = agendaFactory({ mongoConnection });
    Container.set('agendaInstance', agendaInstance);
    logger.info('✌️ Agenda injected into container');
    
    return {agenda: agendaInstance}

  } catch(e) {
    logger.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};