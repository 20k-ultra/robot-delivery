const Simulator = require('../.././robot-delivery').Simulation
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const config = require('./config')
const SchemaValidator = require('./middlewares/SchemaValidator')

/******************/
/* SERVER STORAGE */
/******************/

let savedSimulations = {}

/**************/
/* HTTP SETUP */
/**************/

const validateRequest = SchemaValidator()
app.use(bodyParser.urlencoded({
  extended: true
}))
app.listen(config.port, () => {
  console.log('Started HTTP interface on port:', config.port)
})

/***************/
/* HTTP ROUTES */
/***************/

app.get('/simulation/:id/positions', validateRequest, (req, res) => {
  let id = req.params.id
  let sim = savedSimulations[id]
  if (!sim) {
    res.status(200).json({
      simulator: id,
      error: 'Unable to find that simulator'
    }).send()
  } else {
    res.status(200).json({
      simulator: id,
      positions: sim.getPositions()
    }).send()
  }
})

app.get('/simulation/:id/steps', validateRequest, (req, res) => {
  let id = req.params.id
  let sim = savedSimulations[id]
  if (!sim) {
    res.status(200).json({
      simulator: id,
      error: 'Unable to find that simulator'
    }).send()
  } else {
    res.status(200).json({
      simulator: id,
      steps: sim.getStepsCompleted()
    }).send()
  }
})

app.get('/simulation/:id/deliveries', validateRequest, (req, res) => {
  let id = req.params.id
  let sim = savedSimulations[id]
  if (!sim) {
    res.status(200).json({
      simulator: id,
      error: 'Unable to find that simulator'
    }).send()
  } else {
    res.status(200).json({
      simulator: id,
      sum: sim.getDeliveriesSum()
    }).send()
  }
})

app.get('/simulation/:id/houses/:with', validateRequest, (req, res) => {
  let id = req.params.id
  let _with = req.params.with
  let sim = savedSimulations[id]
  if (!sim) {
    res.status(200).json({
      simulator: id,
      error: 'Unable to find that simulator'
    }).send()
  } else {
    res.status(200).json({
      simulator: id,
      houses: sim.getHousesWithDeliveries(_with)
    }).send()
  }
})

app.post('/simulation', validateRequest, (req, res) => {
  // create simulator
  let sim = new Simulator(req.body.directions, req.body.robots)
  // create sim id
  var simId = Math.random().toString().substring(2, 10)
  // store sim in memory for later access
  savedSimulations[simId] = sim
  // send response
  res.status(201).json({
    id: simId,
    simulation: sim
  }).send()
})

app.put('/simulation/:id/run', validateRequest, (req, res) => {
  let id = req.params.id
  let sim = savedSimulations[id]
  if (!sim) {
    res.status(200).json({
      simulator: id,
      error: 'Unable to find that simulator'
    }).send()
  } else {
    sim.run()
    res.status(200).json({
      simulator: id,
      simulation: sim
    }).send()
  }
})

app.put('/simulation/:id/run/:steps', validateRequest, (req, res) => {
  let id = req.params.id
  let steps = req.params.steps
  let sim = savedSimulations[id]
  if (!sim) {
    res.status(200).json({
      simulator: id,
      error: 'Unable to find that simulator'
    }).send()
  } else {
    sim.run(steps)
    res.status(200).json({
      simulator: id,
      simulation: sim
    }).send()
  }
})

app.delete('/simulation/:id', validateRequest, (req, res) => {
  let id = req.params.id
  let sim = savedSimulations[id]
  if (!sim) {
    res.status(200).json({
      simulator: id,
      error: 'Unable to find that simulator'
    }).send()
  } else {
    delete savedSimulations[id]
    res.status(200).json({
      simulator: id
    }).send()
  }
})
