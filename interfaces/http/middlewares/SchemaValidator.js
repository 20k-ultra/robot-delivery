const Joi = require('joi')
const Schemas = require('../schemas')

module.exports = () => {
  const _validationOptions = {
    abortEarly: false,
    stripUnknown: true
  }

  return (req, res, next) => {
    const route = req.route.path
    const method = req.method.toUpperCase()
    const _schema = Schemas[method][route]
    if (route.indexOf(':') !== -1) {
      // validate id param
      if (req.params.id && !/^[0-9]{8}$/.test(req.params.id)) {
        return res.status(401).json({
          status: 'Bad Request',
          error: [
            'Invalid simulation id'
          ]
        })
      } else if (req.params.steps && (isNaN(req.params.steps) || req.params.steps < 0)) {
        return res.status(401).json({
          status: 'Bad Request',
          error: [
            'Invalid step amount [must be equal or greater to 0]'
          ]
        })
      }
      next()
    } else if (_schema) {
      return Joi.validate(req.body, _schema, _validationOptions, (err, data) => {
        if (err) {
          res.status(400).json({
            status: 'Bad Request',
            error: err.details.map(({ message, type }) => {
              return message.replace(/['"]/g, '')
            })
          })
        } else {
          req.body = data
          next()
        }
      })
    }
    next()
  }
}
