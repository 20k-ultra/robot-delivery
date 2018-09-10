const Simulator = require('./robot-delivery').Simulation

let directions = '^^VV<>'

console.log('creating simulation with 3 robots.')

let simulation = new Simulator(directions, 3)

console.log('all robots start at origin coordinates: ', simulation.getPositions())

console.log('performing 1 turn')

simulation.run(1)

console.log('only 1 robot is moved: ', simulation.getPositions())

console.log('performing remaining moves')

simulation.run()

console.log('houses (coord) with 1 delivery', simulation.getHousesWithDeliveries(1))

console.log('total deliveries ', simulation.getDeliveriesSum())

console.log('final positions: ', simulation.getPositions())
