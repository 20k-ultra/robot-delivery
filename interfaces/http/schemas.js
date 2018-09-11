const Joi = require('joi')

const createSimulation = Joi.object().keys({
  directions: Joi.string().regex(/^[\^\<\>v]+$/i).required(),
  robots: Joi.number().integer().greater(0).default(1)
})

const deleteSimulation = Joi.object().keys({
  id: Joi.number().integer().greater(0).required()
})

const getSimulations = Joi.object().keys({
  id: Joi.number().integer().greater(0).required()
})

const getHousesWith = Joi.object().keys({
  id: Joi.number().integer().greater(0).required(),
  with: Joi.number().integer().greater(0).required()
})

const getDeliveriesSum = Joi.object().keys({
  id: Joi.number().integer().greater(0).required()
})

const getStepsCompleted = Joi.object().keys({
  id: Joi.number().integer().greater(0).required()
})

const run = Joi.object().keys({
  id: Joi.number().integer().greater(0).required(),
  steps: Joi.number().integer().greater(0).default(-1)
})

module.exports = {
  'GET': {
    '/simulation/:id/positions': getSimulations,
    '/simulation/:id/houses/:with': getHousesWith,
    '/simulation/:id/deliveries': getDeliveriesSum,
    '/simulation/:id/steps': getStepsCompleted
  },
  'POST': {
    '/simulation': createSimulation
  },
  'PUT': {
    '/simulation/:id/run/:steps': run
  },
  'DELETE': {
    '/simulation/:id': deleteSimulation
  }
}
