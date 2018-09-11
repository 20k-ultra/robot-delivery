const assert = require('assert')
const Simulator = require('.././robot-delivery').Simulation

describe('robot-delivery', () => {
  describe('creating simulation', () => {
    it('should return simulator with default amount of robots', () => {
      let sim = new Simulator('^^^^')
      assert.strictEqual(sim.robots.length, 1)
      assert.strictEqual(sim.directions.length, 4)
      checkDefaults(sim)
    })

    it('should return simulator with specified number of robots', () => {
      let sim = new Simulator('^', 23)
      assert.strictEqual(sim.robots.length, 23)
      assert.strictEqual(sim.directions.length, 1)
      checkDefaults(sim)
    })

    function checkDefaults (simulator) {
      let numOfHouses = Object.keys(simulator.map).length
      assert.strictEqual(simulator.map['0,0'].bots.length, 0) // no bots by default
      assert.strictEqual(simulator.map['0,0'].deliveries, 0) // no deliveries by default
      assert.strictEqual(numOfHouses, 1) // only 1 house by default
      assert.strictEqual(simulator.stepsCompleted, 0)
      assert.strictEqual(simulator.initiated, false)
    }
  })

  describe('stepping through turns', () => {
    it('should step through 1 turn', () => {
      let sim = new Simulator('^^^^')
      sim.run(1)
      let botPosition = sim.robots[0].posX + ',' + sim.robots[0].posY
      assert.strictEqual(botPosition, '0,1')
    })

    it('should step through more turns then directions', () => {
      let sim = new Simulator('^^^^')
      sim.run(1000)
      let botPosition = sim.robots[0].posX + ',' + sim.robots[0].posY
      assert.strictEqual(botPosition, '0,4')
    })

    it('should step through all turns with 1 bot', () => {
      let sim = new Simulator('^<^<')
      sim.run()
      let robotToTest = 0
      let botPosition = sim.robots[robotToTest].posX + ',' + sim.robots[robotToTest].posY
      assert.strictEqual(botPosition, '-2,2')
    })

    it('should step through all turns with 3 bot', () => {
      let sim = new Simulator('^<^<', 3)
      sim.run()
      let robotToTest = 2
      let botPosition = sim.robots[robotToTest].posX + ',' + sim.robots[robotToTest].posY
      assert.strictEqual(botPosition, '0,1')
    })

    it('should step through all turns with more bots then turns', () => {
      let sim = new Simulator('^<^<', 5)
      sim.run()
      let robotToTest = 4
      let botPosition = sim.robots[robotToTest].posX + ',' + sim.robots[robotToTest].posY
      assert.strictEqual(botPosition, '0,0')
      robotToTest = 0
      botPosition = sim.robots[robotToTest].posX + ',' + sim.robots[robotToTest].posY
      assert.strictEqual(botPosition, '0,1')
    })
  })

  describe('checking positions of robots', () => {
    it('should return position of all robots when there is 1 robot', () => {
      let sim = new Simulator('^^^^', 1)
      sim.run()
      assert.strictEqual(sim.getPositions().length, 1)
      assert.strictEqual(sim.getPositions()[0].posX, 0)
      assert.strictEqual(sim.getPositions()[0].posY, 4)
    })

    it('should return position of all robots without running sim', () => {
      let sim = new Simulator('^^^^', 30)
      assert.strictEqual(sim.getPositions().length, 30)
      assert.strictEqual(sim.getPositions()[3].posX, 0)
      assert.strictEqual(sim.getPositions()[3].posY, 0)
    })

    it('should return position of all robots after running threw turns', () => {
      let sim = new Simulator('^^^^', 30)
      sim.run()
      assert.strictEqual(sim.getPositions().length, 30)
      assert.strictEqual(sim.getPositions()[3].posX, 0)
      assert.strictEqual(sim.getPositions()[3].posY, 1)
    })
  })

  describe('query houses with n number of deliveries', () => {
    it('0 deliveries', () => {
      let sim = new Simulator('^^^^', 1)
      sim.run()
      assert.strictEqual(sim.getHousesWithDeliveries(0).length, 1)
    })

    it('1 delivery', () => {
      let sim = new Simulator('^^^^', 1)
      sim.run()
      assert.strictEqual(sim.getHousesWithDeliveries(1).length, 4)
    })

    it('5 deliveries', () => {
      let sim = new Simulator('^^^^^')
      sim.run()
      assert.strictEqual(sim.getHousesWithDeliveries(5).length, 0)
    })

    it('6000 (too high so should return none)', () => {
      let sim = new Simulator('^^^^', 6)
      sim.run()
      assert.strictEqual(sim.getHousesWithDeliveries(6000).length, 0)
    })
  })

  describe('get total sum of deliveries', () => {
    it('expecting 1 delivery', () => {
      let sim = new Simulator('^', 5)
      sim.run()
      assert.strictEqual(sim.getDeliveriesSum(), 1)
    })

    it('expecting 5 deliveries', () => {
      let sim = new Simulator('^<^V<<^V', 5)
      sim.run()
      assert.strictEqual(sim.getDeliveriesSum(), 5)
    })

    it('expecting 38 deliveries', () => {
      let sim = new Simulator('^<^V>^>><V>^<V>^<>V<>^>V<^>^<>^<V>><^<^^^<>V<^>^VVVV', 10)
      sim.run()
      assert.strictEqual(sim.getDeliveriesSum(), 38)
    })

    it('expecting 52 deliveries', () => {
      let sim = new Simulator('^<^V>^>><V>^<V>^<>V<>^>V<^>^<>^<V>><^<^^^<>V<^>^VVVV', 2)
      sim.run()
      assert.strictEqual(sim.getDeliveriesSum(), 52)
    })
  })

  describe('run sim through entire sequence', () => {
    it('with 1 robot', () => {
      let sim = new Simulator('^^^^', 1)
      sim.run()
      assert.strictEqual(sim.robots[0].deliveries.length, 4)
    })

    it('so 1 bot moves twice', () => {
      let sim = new Simulator('^^^^', 3)
      sim.run()
      assert.strictEqual(sim.robots[0].deliveries.length, 2)
    })

    it('with more robots then moves', () => {
      let sim = new Simulator('^^^^', 6)
      sim.run()
      assert.strictEqual(sim.stepsCompleted, 4)
    })
  })
})
